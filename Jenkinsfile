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
    }

    post {
        always {
            echo "Jenkins pipeline finished"
        }
    }
}