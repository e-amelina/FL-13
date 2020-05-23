function Student(studentName, studentEmail) {
    const name = studentName;
    const email = studentEmail;
    const homeworkResults = [];

    this.getName = () => {
        return name;
    }

    this.getEmail = () => {
        return email;
    }

    this.addHomeworkResult = (HWtopic, HWsuccess) => {
        homeworkResults.forEach(item => {
            if (item.topic === HWtopic) {
                item.success = HWsuccess;
                return;
            }
        });
        homeworkResults.push({
            topic: HWtopic,
            success: HWsuccess
        });
    }

    this.getHomeworkResults = () => {
        return homeworkResults;
    }

}

function FrontendLab(students, failedLimit) {
    const failedHomeworksLimit = failedLimit;
    const studentsList = students.map(student => new Student(student.name, student.email));

    this.printStudentsList = () => {
        for (let i = 0; i < studentsList.length; i++) {
            console.log('name: ' + students[i].name + ', email: ' + students[i].email);
            console.log(studentsList[i].getHomeworkResult());
        }
    }

    this.addHomeworkResults = (homeworkResults) => {
        studentsList.forEach(student => {
            let success = true;
            homeworkResults.results.forEach(res => {
                if (student.getEmail() === res.email) {
                    success = res.success;
                }
            });
            student.addHomeworkResult(homeworkResults.topic, success);
        });
    }

    this.printStudentsEligibleForTest = () => {
        const successStudent = [];
        for (let i = 0; i < students.length; i++) {
            if (findFails(studentsList[i].getHomeworkResults()) <= failedHomeworksLimit) {
                successStudent.push(students[i]);
            }
        }
        successStudent.forEach(student => {
            console.log('name: ' + student.name + ', email: ' + student.email);
        })
    }

    const findFails = (results) => {
        let fail = 0;
        results.forEach(result => {
            if (result.success === false) {
                fail += 1;
            }
        })

        return fail;
    }
}
