import React from 'react';
import './App.scss';

function App() {

  let clientInfo = [
    {
      "name": "Goodbite",
      "url": "https://mygoodbite.com",
      "description": "Shopify Developer",
      "work": "Custom Shopify theme"
    },
    {
      "name": "Alala",
      "url": "https://alalastyle.com",
      "description": "Shopify Developer",
      "work": "Edits, new features, and admin API scripts",
    },
    {
      "name": "Peet Rivko",
      "url": "https://peetrivko.com",
      "description": "Shopify Developer",
      "work": "Edits and new page templates"
    },
    {
      "name": "Antara Life",
      "url": "https://antaralife.com",
      "description": "Shopify/Craft Developer",
      "work": "Translation of CraftCMS website to Shopify"
    }
  ];

  let clientList = clientInfo.map(client => {
    return <Client
      name={ client.name }
      url={ client.url }
      description={ client.description }
      work={ client.work }
    />
  });

  let aboutContent = (
    <p>
      Nicolas Shak is a newly graduated student from the University of California, Santa Cruz with a BS in Technology and Information Management and a minor in Computer Science currently working as a freelance web developer.
    </p>
  );

  let infoContent = (
    <ul>
      <li>→ <a href="mailto:nicolas.shak@gmail.com" target="_blank">Email</a></li>
      <li>→ <a href="https://github.com/nicolasshak" target="_blank">Github</a></li>
      <li>→ <a href="https://linkedin.com/in/nicolasshak" target="_blank">LinkedIn</a></li>
    </ul>
  );

  return (
    <div className="app">
      <header>
        <h1>Nicolas Shak</h1>
      </header>
      <main>
        <div className="column">
          <Section title="About" jsxContent={ aboutContent }/>
          <Section title="Info" jsxContent={ infoContent }/>
        </div>
        <div className="column">
          <Section title="Client List" jsxContent={ clientList }/>
        </div>
      </main>
    </div>
  );
}

export default App;

function Section(props) {
  return (
    <div className="section">
      <div className="section__title">
        { props.title }
      </div>
      <div className="section__content">
        { props.jsxContent }
      </div>
    </div>
  );
}

function Client(props) {
  return(
    <div className="client">
      <div className="client__name">
        <a href={ props.url } target="_blank">{ props.name }</a>
      </div>
      <div className="client__description">
        { props.description }
      </div>
      <div className="client__work">
        { props.work }
      </div>
    </div>
  );
}
