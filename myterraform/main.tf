module "asg" {
  source  = "terraform-aws-modules/autoscaling/aws"
  version = "~> 5.0"

  name                      = "example-asg"
  min_size                  = 1
  max_size                  = 3
  desired_capacity          = 2
  vpc_zone_identifier       = ["subnet-01b9900379da0239d", "subnet-032eb4d270aa7d37f"]
  health_check_type         = "EC2"
  health_check_grace_period = 300

  create_launch_template = false
  launch_template        = aws_launch_template.example.name
}

resource "aws_launch_template" "example" {
  name_prefix   = "example-"
  image_id      = "ami-0474411b350de35fb" # Amazon Linux 2 AMI
  instance_type = "t2.micro"

  user_data = base64encode(<<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user
              curl -sL https://rpm.nodesource.com/setup_14.x | bash -
              yum install -y nodejs
              yum install -y git
              curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              git clone https://github.com/threemay/testbackend.git
              cd testbackend
              docker-compose up -d
              EOF
  )
}

resource "aws_security_group" "allow_all_my" {
  name        = "allow_all_traffic"
  description = "Security group with all inbound and outbound traffic allowed"
  vpc_id      = "vpc-06adbefbb63908b05" # Replace with your VPC ID

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_lb" "example" {
  name               = "example-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_all_my.id]
  subnets            = ["subnet-01b9900379da0239d", "subnet-032eb4d270aa7d37f"]
}

resource "aws_lb_target_group" "example" {
  name     = "example-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "vpc-06adbefbb63908b05"
}

resource "aws_lb_listener" "example" {
  load_balancer_arn = aws_lb.example.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.example.arn
  }
}

resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = module.asg.autoscaling_group_name
  lb_target_group_arn    = aws_lb_target_group.example.arn
}
