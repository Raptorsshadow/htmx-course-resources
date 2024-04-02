import express from 'express';

const courseGoals = [];

var generateGoals = function() {
  return `<ul id="goals">
  ${courseGoals.map(
    (goal, index) => `
    <li id="goal-${index}">
      <span>${goal}</span>
      <button hx-delete="/remove" hx-vals='{"index": "${index}"}' hx-target="#goals" hx-swap="outerHTML">Remove</button>
    </li>
  `
  ).join('')}
  </ul>`;
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
            id="goal-form"
            hx-post="/goals"
            hx-target="ul"
            hx-swap="beforeend"
            >
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          ${generateGoals()}
        </section>
      </main>
    </body>
  </html>
  `);
});

app.delete('/remove', (req, res) => {
const index = req.body.index;
courseGoals.splice(index, 1);
res.send(generateGoals());
 });
app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  courseGoals.push(goalText);
  // res.redirect('/');
  const index = courseGoals.length - 1;
  res.send(`
    <li id="goal-${index}">
      <span>${goalText}</span>
      <button hx-delete="/remove" hx-vals='{"index": "${index}"}' hx-target="#goals" hx-swap="outerHTML">Remove</button>
      </li>
  `);
});


app.listen(3000);
