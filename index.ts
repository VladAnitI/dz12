class Student {
	name: string;
	id: number;
	courses: Course[];

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
		this.courses = [];
	}

	addCourse(courseName: string) {
		let course = new Course(courseName, []);
		this.courses.push(course);
	}

	addGrade(courseName: string, grade: any) {
		let course = this.courses.find((c) => c.courseName === courseName);

		if (!course) {
			throw new Error('Course not found');
		}
		if (typeof grade === 'string') {
			grade = this.convertLetterGradeToNumber(grade);
		}
		course.grades.push(grade);
		course.avgGrade = course.nutrGrade();
	}

	convertLetterGradeToNumber(grade: string) {
		let letterGrades = {
			'A+': 100,
			A: 90,
			B: 80,
			C: 70,
			D: 60,
			F: 50
		};

		return letterGrades[grade] ?? -1;
	}

	studentInfo() {
		console.log(`Name: ${this.name}`);
		console.log(`ID: ${this.id}`);
		console.log(`Courses:`);
		for (let course of this.courses) {
			console.log(`${course.courseName}: ${course.avgGrade}`);
		}
	}
}

class Course {
	courseName: string;
	grades: number[];
	private _avgGrade: number;

	constructor(courseName: string, grades: number[]) {
		this.courseName = courseName;
		this.grades = grades;
		this._avgGrade = this.nutrGrade();
	}

	get avgGrade() {
		return this._avgGrade;
	}

	set avgGrade(value: number) {
		this._avgGrade = value;
	}

	nutrGrade() {
		if (this.grades.length === 0) return 0;

		let sum = this.grades.reduce((a, b) => a + b, 0);
		let count = this.grades.length;
		return sum / count;
	}
}

class InternationalStudent extends Student {
	country: string;

	constructor(name: string, id: number, country: string) {
		super(name, id);
		this.country = country;
	}

	displayStudentInfo() {
		super.studentInfo();
		console.log(`Country: ${this.country}`);
	}
}

const student1 = new Student("John Doe", 12345);

student1.addCourse("Math");
student1.addCourse("History");

student1.addGrade("Math", 95);
student1.addGrade("Math", 95);
student1.addGrade("History", 80);

student1.studentInfo();

const internationalStudent1 = new InternationalStudent("Alice Wonderland", 56789, "USA");

internationalStudent1.addCourse("Physics");
internationalStudent1.addCourse("Literature");

internationalStudent1.addGrade("Physics", "A+");
internationalStudent1.addGrade("Physics", "A");
internationalStudent1.addGrade("Literature", 80);

internationalStudent1.studentInfo(); 
