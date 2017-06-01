/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

const AppStyle = {
  display: 'flex !important',
    minHeight: '100vh !important',
    flexDirection: 'column !important',
};


const ContentStyle = {
  flex: '1 1 auto !important',
    marginTop: '2em !important',
    marginBottom: '2em !important',
};


export function App(props) {
  return (
    <div style={AppStyle}>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header {...props}/>
      <div style={ContentStyle}>
      {React.Children.toArray(props.children)}
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
