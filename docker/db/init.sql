CREATE USER moveit_user WITH PASSWORD 'moveit_password';
CREATE DATABASE moveit OWNER moveit_user;
GRANT ALL PRIVILEGES ON DATABASE moveit TO moveit_user;
