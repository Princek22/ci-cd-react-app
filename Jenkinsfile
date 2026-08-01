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

        stage("Push Docker images to GHCR") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "ghcr-creds",
                        usernameVariable: "GHCR_USER",
                        passwordVariable: "GHCR_TOKEN"
                    )
                ]) {
                    sh '''
                        echo "$GHCR_TOKEN" | docker login ghcr.io \
                            -u "$GHCR_USER" \
                            --password-stdin

                        docker tag ci-cd-frontend:jenkins-${BUILD_NUMBER} \
                            ghcr.io/princek22/ci-cd-frontend:jenkins-${BUILD_NUMBER}

                        docker tag ci-cd-backend:jenkins-${BUILD_NUMBER} \
                            ghcr.io/princek22/ci-cd-backend:jenkins-${BUILD_NUMBER}

                        docker push ghcr.io/princek22/ci-cd-frontend:jenkins-${BUILD_NUMBER}

                        docker push ghcr.io/princek22/ci-cd-backend:jenkins-${BUILD_NUMBER}

                        docker logout ghcr.io
                    '''
                }
            }
        }

        stage("Deploy staging backend") {
            steps {
                withCredentials([
                    string(
                        credentialsId: "render-staging-deploy-hook",
                        variable: "RENDER_DEPLOY_HOOK"
                    )
                ]) {
                    sh '''
                        curl --fail --silent --show-error \
                            --request POST "$RENDER_DEPLOY_HOOK"
                    '''
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