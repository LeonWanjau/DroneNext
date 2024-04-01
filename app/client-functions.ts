const emailAddress = "leonwanjau@gmail.com";

export function sendMail(subject: string, body: string) {
  const url = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
//   window.location.href = encodeURI(url);
window.open(encodeURI(url),"_blank")
}
