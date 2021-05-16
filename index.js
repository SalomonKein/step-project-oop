class Visit {
  constructor(doctor, name, surname, target, date, info) {
    this.name = name;
    this.surname = surname;
    this.target = target;
    this.date = date;
    this.info = info;
    this.doctor = doctor;
  }
  createVisit() {
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
    let info = document.createElement("p");
    let doctor = document.createElement("p");
    container.classList.add("visit__container", `container__${this.doctor}`);
    container.style.position = "relative";
    container.style.marginLeft = "10px";
    pacientName.classList.add("visit__visible");
    more.classList.add("visit__visible");
    more.classList.add("visit__more", `more__${this.doctor}`);
    more.style.cursor = "pointer";

    data.classList.add("visit__hide", `${this.doctor}`);
    target.classList.add("visit__hide", `${this.doctor}`);
    info.classList.add("visit__hide", `${this.doctor}`);
    doctor.classList.add("visit__visible");
    pacientName.innerHTML = `Name: ${this.name} ${this.surname}`;
    doctor.innerHTML = `${this.doctor}`;
    more.innerHTML = "view more";
    data.innerHTML = `Date: ${this.date}`;
    target.innerHTML = `visit for: ${this.target}`;
    info.innerHTML = `Info: ${this.info}`;
    fieldVisit.append(container);
    container.append(pacientName);
    container.append(doctor);

    container.append(data);
    container.append(target);
    container.append(info);
    container.append(more);

    let closeDiv = document.createElement("div");
    closeDiv.classList.add("visit__close");
    closeDiv.style.cssText = `position: absolute;
    width: 20px;
    height: 20px;
    border: darkslategrey solid 2px;;
    border-radius: 13px;
    background: darkgrey;
    top: 0px;
    right: 0px;
    cursor: pointer;
    `;
    container.append(closeDiv);
    let crossLine1 = document.createElement("div");
    let crossLine2 = document.createElement("div");
    crossLine1.style.cssText = `position: absolute;
    width: 15px;
    border-top: none;
    border-left: none;
    border-right: none;
    transform: rotate(45deg);
    border: black solid 1px;
    top: 9px;
    left: 2px;
    `;
    crossLine2.style.cssText = `position: absolute;
    width: 15px;
    border-top: none;
    border-left: none;
    border-right: none;
    transform: rotate(-45deg);
    border: black solid 1px;
    top: 9px;
    left: 2px;
    `;
    closeDiv.append(crossLine1);
    closeDiv.append(crossLine2);
    closeDiv.addEventListener("click", () => {
      container.remove();
      localStorage.removeItem(this.doctor);
      if (fieldVisit.childElementCount == 0) {
        let h2 = document.createElement("h2");
        h2.innerHTML = "No items have been added";
        fieldVisit.append(h2);
      }
    });

    container.onmousedown = function (event) {
        if (event.target == closeDiv || event.target == crossLine1 || event.target == crossLine2 || event.target == more) {
        return;
      }
           
      let shiftX = event.clientX - container.getBoundingClientRect().left + fieldVisit.getBoundingClientRect().left + 10;
      let shiftY = event.clientY - container.getBoundingClientRect().top;

      container.style.position = "absolute";
      container.style.zIndex = 10;
      
      fieldVisit.append(container);      
      moveAt(event.pageX, event.pageY);

     

      function moveAt(pageX, pageY) {
        
        container.style.left = pageX - shiftX + "px";
        container.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        let contWidth = container.getBoundingClientRect().width;
        let contHeight = container.getBoundingClientRect().height;
        container.hidden = true;
        let curentArea = document.querySelector(".field__visit");        
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        // console.log(container);
        let curentLeft = document.elementFromPoint(event.pageX - shiftX + fieldVisit.getBoundingClientRect().left +10, event.clientY);
        
        let curentTop = document.elementFromPoint(event.clientX , event.clientY-shiftY);
        
        
        let curentRight = document.elementFromPoint(event.pageX - shiftX + fieldVisit.getBoundingClientRect().left + 10 + contWidth, event.clientY);
        // console.log(event.pageX - shiftX + fieldVisit.getBoundingClientRect().left + 10 + contWidth);
        let curentBottom = document.elementFromPoint(event.clientX , event.clientY-shiftY+contHeight);
        container.hidden = false;
        // console.log(curentLeft);
        // console.log(contBottom);
        // console.log(curentRight);
        // console.log(curentTop);

        //if (container.getBoundingClientRect().left<=curentArea.getBoundingClientRect().left+4||container.getBoundingClientRect().top<=curentArea.getBoundingClientRect().top+4||container.getBoundingClientRect().left+container.getBoundingClientRect().width+10>=curentArea.getBoundingClientRect().left+curentArea.getBoundingClientRect().width-4||container.getBoundingClientRect().top+container.getBoundingClientRect().height>=curentArea.getBoundingClientRect().top+curentArea.getBoundingClientRect().height-4) 
        if (curentLeft !==curentArea || curentTop !==curentArea  || curentRight !==curentArea || curentBottom !==curentArea) {
         return
        }
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
      };
    };

    container.ondragstart = function () {
      return false;
    };
  }
  showMore() {
    let moreShow = document.querySelector(`.more__${this.doctor}`);
    let pArr = document.querySelectorAll(`p.${this.doctor}`);

    function hideShow() {
      if (moreShow.innerHTML == "view more") {
        moreShow.innerHTML = "close more";
      } else if (moreShow.innerHTML == "close more") {
        moreShow.innerHTML = "view more";
      }

      pArr.forEach(function (e) {
        e.classList.toggle("visit__hide");
      });
    }

    moreShow.addEventListener("click", hideShow);
  }
}

class VisitToTerapevt extends Visit {
  constructor(doctor, name, surname, target, date, info, age) {
    super(doctor, name, surname, target, date, info);

    this.age = age;
    this.doctor = doctor;
  }
  createVisit() {
    super.createVisit();

    let pointToAdd = document.querySelector(`.more__${this.doctor}`);
    let age = document.createElement("p");

    age.innerHTML = `age: ${this.age}`;
    age.classList.add("visit__hide", `${this.doctor}`);
    pointToAdd.before(age);
  }
  showMore() {
    super.showMore();
  }
}

class VisitToDantist extends Visit {
  constructor(doctor, name, surname, target, date, info, lastDate) {
    super(doctor, name, surname, target, date, info);

    this.lastDate = lastDate;
    this.doctor = doctor;
  }
  createVisit() {
    super.createVisit();

    let pointToAdd = document.querySelector(`.more__${this.doctor}`);
    let lastDate = document.createElement("p");

    lastDate.innerHTML = `Date of last visit: ${this.lastDate}`;
    lastDate.classList.add("visit__hide", `${this.doctor}`);
    pointToAdd.before(lastDate);
  }
  showMore() {
    super.showMore();
  }
}

class VisitToСardiologist extends Visit {
  constructor(
    doctor,
    name,
    surname,
    target,
    date,
    info,
    usualPressure,
    bodyWieght,
    age,
    heartDiseas
  ) {
    super(doctor, name, surname, target, date, info);

    this.usualPressure = usualPressure;
    this.bodyWieght = bodyWieght;
    this.age = age;
    this.heartDisease = heartDiseas;
    this.doctor = doctor;
  }

  createVisit() {
    super.createVisit();

    let pointToAdd = document.querySelector(`.more__${this.doctor}`);
    let usualPressure = document.createElement("p");
    let bodyWieght = document.createElement("p");
    let age = document.createElement("p");
    let heartDisease = document.createElement("p");

    usualPressure.innerHTML = `Usual Pressure: ${this.usualPressure}`;
    bodyWieght.innerHTML = `Body mass ratio: ${this.bodyWieght}`;
    age.innerHTML = `Age: ${this.age}`;
    heartDisease.innerHTML = `Сardiovascular disease: ${this.heartDisease}`;
    usualPressure.classList.add("visit__hide", `${this.doctor}`);
    bodyWieght.classList.add("visit__hide", `${this.doctor}`);
    age.classList.add("visit__hide", `${this.doctor}`);
    heartDisease.classList.add("visit__hide", `${this.doctor}`);
    pointToAdd.before(usualPressure);
    pointToAdd.before(bodyWieght);
    pointToAdd.before(age);
    pointToAdd.before(heartDisease);
  }
  showMore() {
    super.showMore();
  }
}

let buttonToCreate = document.querySelector(".button");

buttonToCreate.onclick = function () {
  let inWork = document.querySelector(".visit__modalForm");
  if (inWork) {
    return;
  }
  let formModal = document.createElement("form");
  formModal.classList.add("visit__modalForm");

  formModal.style.cssText = `position: absolute;
    left: 35%;
    top: 200px;
    border: blue solid 3px;
    min-width: 300px;
    min-height: 300px;
    border-radius: 5px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    padding: 5px;
    z-index: 11;
    `;
  let body = document.querySelector("body");
  body.prepend(formModal);
  let selectList = document.createElement("select");
  selectList.id = "select__doctor";

  let selectDisable = document.createElement("option");
  selectDisable.setAttribute("selected", "selected");
  selectDisable.setAttribute("disabled", "disabled");
  let selectTerap = document.createElement("option");
  selectTerap.id = "terapevt";
  selectTerap.setAttribute("value", "terapevt");
  let selectDantist = document.createElement("option");
  selectDantist.id = "dantist";
  selectDantist.setAttribute("value", "dantist");
  let selectCardio = document.createElement("option");
  selectCardio.id = "cardiologist";
  selectCardio.setAttribute("value", "cardiologist");
  selectDisable.innerHTML = "Choise a doctor";
  selectTerap.innerHTML = "Terapevt";
  selectDantist.innerHTML = "Dantist";
  selectCardio.innerHTML = "Сardiologist";
  selectTerap.classList.add("option__Terapevt");
  selectDantist.classList.add("option__Dantist");
  selectCardio.classList.add("option__Сardiologist");
  formModal.append(selectList);
  selectList.append(selectDisable);
  selectList.append(selectTerap);
  selectList.append(selectDantist);
  selectList.append(selectCardio);

  let closeDiv = document.createElement("div");
  closeDiv.classList.add("modal__close");
  closeDiv.style.cssText = `position: absolute;
    width: 25px;
    height: 25px;
    border: blue solid 2px;
    border-radius: 13px;
    background: aqua;
    top: -24px;
    right: -24px;
    `;
  formModal.append(closeDiv);
  let crossLine1 = document.createElement("div");
  let crossLine2 = document.createElement("div");
  crossLine1.style.cssText = `position: absolute;
    width: 20px;
    border-top: none;
    border-left: none;
    border-right: none;
    transform: rotate(45deg);
    border: black solid 1px;
    top: 12px;
    left: 2px;
    `;
  crossLine2.style.cssText = `position: absolute;
    width: 20px;
    border-top: none;
    border-left: none;
    border-right: none;
    transform: rotate(-45deg);
    border: black solid 1px;
    top: 12px;
    left: 2px;
    `;
  closeDiv.append(crossLine1);
  closeDiv.append(crossLine2);

  closeDiv.addEventListener("click", () => {
    formModal.remove();
  });

  selectList.onchange = function doctorSelect() {
    let test = document.querySelector(".moreInform__test");
    if (test) {
      let selectArr = document.querySelectorAll(".added");
      selectArr.forEach((item) => {
        item.remove();
      });
    }
    let terapevt = document.querySelector(".option__Terapevt");
    let dantist = document.querySelector(".option__Dantist");
    let cardio = document.querySelector(".option__Сardiologist");
    let ageP = document.createElement("div");
    ageP.classList.add("added");
    ageP.style.display = "block";
    ageP.innerHTML = "type your age:";
    let ageInput = document.createElement("input");
    ageInput.id = "age";
    ageInput.setAttribute("name", "age");
    ageInput.required = true;
    ageInput.classList.add("added");
    ageInput.style.marginRight = "0px";
    let moreInform = document.createElement("textarea");
    moreInform.id = "info";
    moreInform.setAttribute("name", "info");
    moreInform.classList.add("moreInform__test", "added");

    moreInform.style.maxWidth = "98%";
    moreInform.style.height = "100px";
    moreInform.setAttribute("maxlength", "400");
    moreInform.setAttribute("type", "text");
    moreInform.style.resize = "none";
    let infoP = document.createElement("div");
    infoP.classList.add("added");
    infoP.innerHTML = "type more information:";
    let name = document.createElement("input");
    name.id = "name";
    name.setAttribute("name", "name");
    name.required = true;
    name.classList.add("added");
    let nameP = document.createElement("div");
    nameP.classList.add("added");
    nameP.innerHTML = "type your name:";
    let surname = document.createElement("input");
    surname.id = "surname";
    surname.setAttribute("name", "surname");
    surname.required = true;
    surname.classList.add("added");
    let surnameP = document.createElement("div");
    surnameP.classList.add("added");
    surnameP.innerHTML = "type your surname:";
    let target = document.createElement("input");
    target.id = "target";
    target.setAttribute("name", "target");
    target.required = true;
    target.classList.add("added");
    let targetP = document.createElement("div");
    targetP.classList.add("added");
    targetP.innerHTML = "type the purpose of the visit:";
    let data = document.createElement("input");
    data.id = "date";
    data.setAttribute("name", "date");
    data.required = true;
    data.classList.add("added");
    data.setAttribute("type", "date");
    let dataP = document.createElement("div");
    dataP.classList.add("added");
    dataP.innerHTML = "select a date:";
    let submit = document.createElement("input");
    submit.classList.add("added", "form__submit");
    submit.setAttribute("type", "submit");
    submit.innerHTML = "Create";
    let lastDate = document.createElement("input");
    lastDate.id = "lastDate";
    lastDate.setAttribute("name", "lastDate");
    lastDate.required = true;
    lastDate.classList.add("added");
    let lastDateP = document.createElement("div");
    lastDateP.classList.add("added");
    lastDateP.innerHTML = "input the date of the last visit:";
    let usualPressure = document.createElement("input");
    usualPressure.id = "usualPressure";
    usualPressure.setAttribute("name", "usualPressure");
    usualPressure.required = true;
    usualPressure.classList.add("added");
    let usualPressureP = document.createElement("div");
    usualPressureP.classList.add("added");
    usualPressureP.innerHTML = "input the daily pressure:";
    let bodyWieght = document.createElement("input");
    bodyWieght.id = "bodyWieght";
    bodyWieght.setAttribute("name", "bodyWieght");
    bodyWieght.required = true;
    bodyWieght.classList.add("added");
    let bodyWieghtP = document.createElement("div");
    bodyWieghtP.classList.add("added");
    bodyWieghtP.innerHTML = "input the mass index:";
    let heartDisease = document.createElement("input");
    heartDisease.id = "heartDisease";
    heartDisease.setAttribute("name", "heartDisease");
    heartDisease.required = true;
    heartDisease.classList.add("added");
    let heartDiseaseP = document.createElement("div");
    heartDiseaseP.classList.add("added");
    heartDiseaseP.innerHTML = "input existing cardiovascular disease:";
    let selectDoctor;
    if (this.value == "terapevt") {
      selectList.after(ageInput);
      selectList.after(ageP);
      selectDoctor = terapevt;
      
    } else if (this.value == "dantist") {
      selectList.after(lastDate);
      selectList.after(lastDateP);
      selectDoctor = dantist;
      
    } else if (this.value == "cardiologist") {
      selectList.after(usualPressure);
      selectList.after(usualPressureP);
      selectList.after(bodyWieght);
      selectList.after(bodyWieghtP);
      selectList.after(heartDisease);
      selectList.after(heartDiseaseP);
      selectDoctor = cardio;
      
    }

    formModal.append(infoP);
    selectList.after(data);
    selectList.after(dataP);
    selectList.after(target);
    selectList.after(targetP);
    selectList.after(surname);
    selectList.after(surnameP);
    selectList.after(name);
    selectList.after(nameP);
    formModal.append(moreInform);
    moreInform.after(submit);

    dataProcessing(selectDoctor);
  };
};

let countT = 0;
let countD = 0;
let countC = 0;
function dataProcessing(doctor) {
  let push = document.querySelector(".form__submit");
  push.onclick = function (event) {
    event.preventDefault();

    const form = document.querySelector(".visit__modalForm");
    const data = Object.fromEntries(new FormData(form).entries());
    let dataValid = Object.fromEntries(new FormData(form).entries());
    delete dataValid.info;
    for (let key in dataValid) {
      if (data[key] == "") {
        return alert("fill in all fields");
      }
    }
    data["doctor"] = doctor.id;

    if (data.doctor == "terapevt") {
      console.log("countT =", countT);
      let doctorVisit = "terapevt_visit_N" + ++countT;

      let newVisit = new VisitToTerapevt(
        doctorVisit,
        data.name,
        data.surname,
        data.target,
        data.date,
        data.info,
        data.age
      );
      localStorage.setItem(`${doctorVisit}`, JSON.stringify(data));
      newVisit.createVisit();
      newVisit.showMore();
    } else if (data.doctor == "dantist") {
      let doctorVisit = `dantist_visit_N${countD++}`;
      let newVisit = new VisitToDantist(
        doctorVisit,
        data.name,
        data.surname,
        data.target,
        data.date,
        data.info,
        data.lastDate
      );
      localStorage.setItem(`${doctorVisit}`, JSON.stringify(data));
      newVisit.createVisit();
      newVisit.showMore();
    } else if (data.doctor == "cardiologist") {
      let doctorVisit = "cardiologist_visit_N" + countC++;
      let newVisit = new VisitToСardiologist(
        doctorVisit,
        data.name,
        data.surname,
        data.target,
        data.date,
        data.info,
        data.usualPressure,
        data.bodyWieght,
        data.age,
        data.heartDisease
      );
      localStorage.setItem(`${doctorVisit}`, JSON.stringify(data));
      newVisit.createVisit();
      newVisit.showMore();
    }

    let formModal = document.querySelector(".visit__modalForm");
    formModal.remove();
  };
}

function localCash() {
  return Object.keys(localStorage).reduce((obj, k) => {
    return {...obj, [k]: JSON.parse(localStorage.getItem(k))};
  }, {});
}

let localData = localCash();

let dataLocal = {};
function filterLocalData() {
  for (let key in localData) {
    let doctorVisit = key;
    
    if (key.match(/visit/)) {
      key = localData[key];
      if (key.doctor == "terapevt") {
        let newVisit = new VisitToTerapevt(
          doctorVisit,
          key.name,
          key.surname,
          key.target,
          key.date,
          key.info,
          key.age          
        );
        newVisit.createVisit();
        newVisit.showMore();
        console.log(doctorVisit);
        countT = doctorVisit.slice(-1);
        console.log(countT);
      } else if (key.doctor == "dantist") {        
        let newVisit = new VisitToDantist(
          doctorVisit,
          key.name,
          key.surname,
          key.target,
          key.date,
          key.info,
          key.lastDate
        );
        newVisit.createVisit();
        newVisit.showMore();
        countD = doctorVisit.slice(-1);
      } else if (key.doctor == "cardiologist") {
        let newVisit = new VisitToСardiologist(
          doctorVisit,
          key.name,
          key.surname,
          key.target,
          key.date,
          key.info,
          key.usualPressure,
          key.bodyWieght,
          key.age,
          key.heartDisease
        );
        countC = doctorVisit.slice(-1); 
        newVisit.createVisit();
        newVisit.showMore();
      }
    }
  }
}

filterLocalData();
