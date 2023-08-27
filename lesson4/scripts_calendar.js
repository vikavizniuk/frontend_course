const selectors = {
  prevMonth: "month_prev",
  currMonth: "month_curr",
  nextMonth: "month_next",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Calendar {
  constructor() {
    this.selectedMonth = new Date();
  }

  // RENDER

  render() {
    this.renderMonth();
    this.addMonthEventListeners();
    this.addDaysEventListener();
  }

  renderMonth() {
    const prev = document.getElementById(selectors.prevMonth);
    const curr = document.getElementById(selectors.currMonth);
    const next = document.getElementById(selectors.nextMonth);

    const date = new Date(this.selectedMonth);
    const monthIndex = date.getUTCMonth();

    curr.innerHTML = this.convertDateToMonthString(date);

    date.setMonth(monthIndex - 1);
    prev.innerHTML = this.convertDateToMonthString(date);

    date.setMonth(monthIndex + 1);
    next.innerHTML = this.convertDateToMonthString(date);
  }

  // ACTIONS

  addMonthEventListeners() {
    const prev = document.getElementById(selectors.prevMonth);
    const next = document.getElementById(selectors.nextMonth);

    prev.addEventListener("click", this.setSelectedMonth.bind(this, -1));
    next.addEventListener("click", this.setSelectedMonth.bind(this, +1));
  }

  //CALENDAR DAYS

  addDaysEventListener() {
    const calendar = document.querySelector(".calendar_days");
    let currentDate = new Date(this.selectedMonth);

    function updateCalendar() {
      calendar.innerHTML = "";

      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const startingDay = firstDay.getDay();

      for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement("div");
        calendar.appendChild(emptyCell);
      }

      for (let day = 1; day <= lastDay; day++) {
        const monthIndex = currentDate.getUTCMonth();
        const year = currentDate.getFullYear();
        const dayCell = document.createElement("div");

        dayCell.classList.add("day-cell");
        dayCell.textContent = day;
        calendar.appendChild(dayCell);
        dayCell.addEventListener("click", function () {
          const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const dayOfWeek = clickedDate.toLocaleDateString("en-US", {
            weekday: "long",
          });
          alert(
            day + " " + months[monthIndex] + " " + year + " " + `${dayOfWeek}`
          );
        });
      }
    }

    const prev = document.getElementById(selectors.prevMonth);
    const next = document.getElementById(selectors.nextMonth);

    prev.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
    });
    next.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
    });
    updateCalendar();
  }

  setSelectedMonth(number) {
    if (!number) return;

    const monthIndex = this.selectedMonth.getUTCMonth();

    this.selectedMonth.setUTCMonth(monthIndex + number);

    this.renderMonth();
  }

  // UTILS

  convertDateToMonthString(date) {
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    return `${months[monthIndex]} ${year}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Calendar().render();
});
