pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify source') {
            steps {
                sh 'echo "Jenkins checked out the repository"'
                sh 'pwd'
                sh 'ls -la'
            }
        }
    }

    post {
        always {
            echo 'Jenkins pipeline finished'
        }
    }
}