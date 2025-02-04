/backend
│── /src
│   ├── /routes
│   ├── /controllers
│   ├── /models
│   ├── /middlewares
│   ├── app.ts        # Configuration de l’application Express (comme App.tsx)
│   ├── main.ts       # Point d’entrée principal (comme main.tsx)
│   ├── connectDB.ts  # Connexion MongoDB
│── .env
│── package.json
│── tsconfig.json

npm init -y
npm i express ...
package.json rajouter
  "type": "module",

```js
  const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    // ou utiliser await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```