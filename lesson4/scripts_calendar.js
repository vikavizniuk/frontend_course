const selectors = {
  prevMonth: "month_prev",
  currMonth: "month_curr",
  nextMonth: "month_next",
  calendarDays: "calendar_days",
  emptyCell: "empty-cell",
  dayCell: "day-cell",
  days: "days",
  calendarWeek: "week_days",
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
const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SUT", "SUN"];

class Calendar {
  constructor() {
    this.selectedMonth = new Date();
  }

  // RENDER

  render() {
    this.renderMonth();
    this.setWeekDays();
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

  addDaysEventListener() {
    const prev = document.getElementById(selectors.prevMonth);
    const next = document.getElementById(selectors.nextMonth);
    let currentDate = new Date(this.selectedMonth);

    prev.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      this.updateCalendar(currentDate);
    });

    next.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      this.updateCalendar(currentDate);
    });
    this.updateCalendar(currentDate);
  }

  addClickDateEventListener(dayCell, day, monthIndex, year, dayOfWeek) {
    dayCell.addEventListener("click", () => {
      alert(`${day} ${months[monthIndex]} ${year} ${dayOfWeek}`);
    });
  }

  // CALENDAR

  setWeekDays() {
    const weekDays = document.querySelectorAll("#days");
    for (let i = 0; i < weekDays.length; i++) {
      weekDays[i].textContent = days[i];
    }
  }

  updateCalendar(currentDate) {
    const calendar = document.getElementById(selectors.calendarDays);

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

    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    for (let i = 0; i < startingDay; i++) {
      const prevMonthIndex = currentDate.getUTCMonth() - 1;
      const emptyCell = document.createElement("div");
      emptyCell.classList.add(selectors.emptyCell);
      emptyCell.textContent =
        shortMonths[prevMonthIndex] +
        " " +
        (prevMonthLastDay - startingDay + i + 1);
      calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay; day++) {
      const monthIndex = currentDate.getUTCMonth();
      const dayCell = document.createElement("div");
      const year = currentDate.getFullYear();

      dayCell.classList.add(selectors.dayCell);
      dayCell.textContent = shortMonths[monthIndex] + " " + day;
      calendar.appendChild(dayCell);

      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayOfWeek = clickedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      this.addClickDateEventListener(dayCell, day, monthIndex, year, dayOfWeek);
    }

    const nextMonthFirstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    const nextMonthStartingDay = nextMonthFirstDay.getDay();
    const remainingEmptyCells = 7 - ((startingDay + lastDay) % 7);
    for (let i = 0; i < remainingEmptyCells; i++) {
      const year = currentDate.getFullYear() + 1;
      const nextMonthIndex = currentDate.getUTCMonth() + 1;
      const emptyCell = document.createElement("div");
      emptyCell.classList.add(selectors.emptyCell);
      emptyCell.textContent = shortMonths[nextMonthIndex] + " " + (i + 1);
      calendar.appendChild(emptyCell);
    }
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
