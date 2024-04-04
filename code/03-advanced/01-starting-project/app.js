import express from 'express';

const courseGoals = [];

const renderGoalListItem = (goal) => `
   <li>
     <span>${goal.text}</span>
     <button hx-delete="/remove/${goal.id}" hx-target="closest li">Remove</button>
   </li>
 `;

const renderGoalList = () => `<ul id="goals" hx-swap="outerHTML" hx-confirm="Are You sure?">${courseGoals.map(renderGoalListItem).join('')}</ul>`;

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
            hx-target="#goals"
            hx-swap="beforeend"
            hx-on::after-request="this.reset()"
            hx-disabled-elt="form button"
            >
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          ${renderGoalList()}
        </section>
      </main>
    </body>
  </html>
  `);
});

app.delete('/remove/:id', (req, res) => {
  const id = req.params.id;
  const index = courseGoals.findIndex(ele => ele.id === id)
  courseGoals.splice(index, 1);
  res.send();
});

app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  const goal = {text: goalText, id: new Date().getTime().toString()}
  courseGoals.push(goal);
  setTimeout(() => {
    res.send(renderGoalListItem(goal));
  }, 1000);
});

app.listen(3000);
