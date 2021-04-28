class Visit {
  constructor(name, surname, target, date) {
    this.name = name;
    this.surname = surname;
    this.target = target;
    this.date = date;
  }
  createVisit(doctor) {
    let noVisit = document.querySelector("h2");
    if (noVisit) {
      noVisit.remove();
    }

    let fieldVisit = document.querySelector(".field__visit");
    let container = document.createElement("div");
    let pacientName = document.createElement("p");
    let more = document.createElement("p");
    let data = document.createElement("p");
    let target = document.createElement("p");
    container.classList.add("visit__container", `${doctor}`);    
    pacientName.classList.add(`visit__${doctor}`, "visit__visible", ); 
    more.classList.add("visit__visible");    
    more.classList.add("visit__more");
    data.classList.add("visit__hide");    
    target.classList.add("visit__hide");    
    pacientName.innerHTML = `${this.name} ${this.surname}`;    
    more.innerHTML = "view more";    
    data.innerHTML = `${this.date}`;    
    target.innerHTML = `${this.target}`;
    fieldVisit.append(container);
    container.append(pacientName);
    container.append(more);
    container.append(data);
    container.append(target);
    more.onclick = function () {
        // data.classList.toggle("visit__hide");
        // target.classList.toggle("visit__hide");
        let pArr = document.querySelectorAll("p");
        pArr.forEach(function(e){e.classList.toggle("visit__hide")});
    };
  }
}

// let newVisit = new Visit("John", "Dow", "Sick and destroy", "10.01.2020")
// let newVisit2 = new Visit("John", "Dow")
// newVisit.createVisit();
// newVisit2.createVisit();

class VisitToTerapevt extends Visit {
  constructor(name, surname, target, date, age) {
    super(name, surname, target, date);
    this.doctor = "Terapevt";
    this.age = age;
  }
  createVisit() {
    super.createVisit(this.doctor);
    let doctor = document.createElement("p");
    let pointToadd = document.querySelector(`.visit__${this.doctor}`);
    let container = document.querySelector(`.${this.doctor}`);
    let age = document.createElement("p"); 
    doctor.innerHTML = `${this.doctor}`;
    doctor.classList.add("visit__visible");
    pointToadd.append(doctor);       
    age.innerHTML = `${this.age}`;
    age.classList.add("visit__hide");
    container.append(age);
  }
}
let newVisit = new VisitToTerapevt(
  "John",
  "Dow",
  "Sick and destroy",
  "10.01.2020",
  "34"
);
newVisit.createVisit();

class VisitToDantist extends Visit {
  constructor(name, surname, target, date, lastDate) {
    super(name, surname, target, date);
    this.doctor = "Dantist";
    this.lastDate = lastDate;
  }
  createVisit() {
    super.createVisit(this.doctor);
    let doctor = document.createElement("p");
    let pointToadd = document.querySelector(`.visit__${this.doctor}`);
    let container = document.querySelector(`.${this.doctor}`);
    let lastDate = document.createElement("p"); 
    doctor.innerHTML = `${this.doctor}`;
    doctor.classList.add("visit__visible");
    pointToadd.append(doctor);       
    lastDate.innerHTML = `${this.lastDate}`;
    lastDate.classList.add("visit__hide");
    container.append(lastDate);
  }
}
let newVisit2 = new VisitToDantist(
    "John12",
    "Dow12",
    "vqvfvq dvv fvv",
    "14.03.2021",
    "03.03.2005"
  );
  newVisit2.createVisit();

class VisitToСardiologist extends Visit {
  constructor(
    name,
    surname,
    target,
    date,
    usualPressure,
    bodyWieght,
    age,
    heartDiseas
  ) {
    super(name, surname, target, date);
    this.doctor = "Сardiologist";
    this.usualPressure = usualPressure;
    this.bodyWieght = bodyWieght;
    this.age = age;
    this.heartDisease = heartDiseas;
  }

  createVisit() {
    super.createVisit(this.doctor);
    let doctor = document.createElement("p");
    let pointToadd = document.querySelector(`.visit__${this.doctor}`);
    let container = document.querySelector(`.${this.doctor}`);
    let usualPressure = document.createElement("p");
    let bodyWieght = document.createElement("p");
    let age = document.createElement("p");
    let heartDisease = document.createElement("p");
    doctor.innerHTML = `${this.doctor}`;
    doctor.classList.add("visit__visible");
    pointToadd.append(doctor);       
    usualPressure.innerHTML = `${this.usualPressure}`;
    bodyWieght.innerHTML = `${this.bodyWieght}`;
    age.innerHTML = `${this.age}`;
    heartDisease.innerHTML = `${this.heartDisease}`;
    usualPressure.classList.add("visit__hide");
    bodyWieght.classList.add("visit__hide");
    age.classList.add("visit__hide");
    heartDisease.classList.add("visit__hide");
    container.append(usualPressure);
    container.append(bodyWieght);
    container.append(age);
    container.append(heartDisease);
  }
}

let newVisit3 = new VisitToСardiologist(
    "John3",
    "Dow3",
    "bbmbj l;l ;k;l",
    "06.04.2021",
    "120/80",
    "8",
    "25",
    "none"
  );
  newVisit3.createVisit();