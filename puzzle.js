function checkPuzzle() {
  const ans = document.getElementById("ans").value;
  console.log(ans)
  // write regexp to check if ans is "sand" case insensitive
  if (/^sand$/i.test(ans)) {
    alert("Correct!");

    // Notify YOU by email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "your-email@example.com",
        message: "Someone solved the puzzle!"
      })
    }).then(response => {
      alert("You Should be receiving your gift shortly!");
      window.location.reload();
    });
  } else {
    alert("Wrong answer, try again!");
  }
}
