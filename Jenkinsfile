pipeline {
    agent any

    tools {
        nodejs "node24"
    }

    stages {
        stage("Node version") {
            steps {
                sh "node --version"
                sh "npm --version"
            }
        }

        stage("Frontend install") {
            steps {
                sh "npm ci"
            }
        }

        stage("Frontend lint") {
            steps {
                sh "npm run lint"
            }
        }

        stage("Frontend tests") {
            steps {
                sh "npm test -- --run"
            }
        }

        stage("Frontend build") {
            steps {
                sh "npm run build"
            }
        }

        stage("Backend tests") {
            steps {
               dir("backend") {
                    sh "npm ci"
                    sh "npm test"
                    sh "node --check src/server.js"
                }
            }
        }

        stage("Docker CLI check") {
            steps {
                sh "docker --version"
                sh "docker ps"
            }
        }

        stage("Build frontend Docker image") {
            steps {
                sh "docker build -t ci-cd-frontend:jenkins-${BUILD_NUMBER} ."
            }
        }

        stage("Build backend Docker image") {
            steps {
                sh "docker build -t ci-cd-backend:jenkins-${BUILD_NUMBER} ./backend"
            }
        }
    }

    post {
        always {
            echo "Jenkins pipeline finished"
        }
    }
}