function checkPuzzle() {
  const ans = document.getElementById("answer").value;

  if (ans == "12") {
    alert("Correct!");

    // Notify YOU by email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "your-email@example.com",
        message: "Someone solved the puzzle!"
      })
    });

  } else {
    alert("Wrong answer, try again!");
  }
}
