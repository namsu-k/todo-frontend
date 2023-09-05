export default function deadlineFormatter(dateString) {
  if (dateString == null) {
    return "마감기한 없음";
  }
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return `${year}년 ${month}월 ${day}일`;
}
