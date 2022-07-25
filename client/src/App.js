import React from 'react';
import { Route, Routes } from 'react-router-dom'

// Cmps
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'

// Main Page + Auth
import { HomePage } from './views/home-page';
import { About } from './views/about';
import { LoginSignup } from './views/auth/LoginSignup';

// Story App
import { StoryApp } from './views/story/story-app';
import { StoryDetails } from './views/story/story-details';
import { StoryEdit } from './views/story/story-edit';

// QuoteApp
import { QuoteApp } from './views/quote/quote-app.jsx'
import { QuoteEdit } from './views/quote/quote-edit';

// CollectionApp
import { CollectionApp } from './views/collection/collection-app';

export const App = () => {

  return (
    <main className="app-container">
      {/* <AppHeader /> */}
      <section className="content-container">
        <Routes>
          {/* Main Page + Auth*/}
          <Route path="/" element={<HomePage />}>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<LoginSignup />} />
          </Route>
          <Route path="/about" element={<About />} />

          {/* Story App */}
          <Route path="/story" element={<StoryApp />} />
          <Route path="/story/:storyId" element={<StoryDetails />} />
          <Route path="/story/edit" element={<StoryEdit />} />
          <Route path="/story/edit/:storyId" element={<StoryEdit />} />

          {/* Quote App */}
          <Route path="/quote" element={<QuoteApp />} />
          <Route path="/quote/edit" element={<QuoteEdit />} />
          <Route path="/quote/edit/:quoteId" element={<QuoteEdit />} />

          {/* Collection App */}
          <Route path="/collection" element={<CollectionApp />} />
        </Routes>
      </section>
      <AppFooter />
    </main>
  );
}

