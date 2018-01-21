import React from 'react';

import Paper from 'material-ui/Paper';

const Footer = () => {
    return (
      <div>
      <Paper style={styles.footer} zDepth={1}>
        <div className="row">
          <div className='col-md-7'>
            <div className='col-md-4' />
              <div className='col-md-4'>
                <h1>Zac Bridge</h1>
              </div>

          </div>
          <div className='col-md-3'>
            <div className='col-md-1'>
              <a href='https://github.com/ZacBridge' target='_blank'>
                <img
                style={styles.footerImages}
                src='https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-256.png' />
              </a>
            </div>

            <div className='col-md-1'></div>
            <div className='col-md-1'>
              <a href='https://www.facebook.com/zac.bridge.9' target='_blank'>
                <img
                  style={styles.footerImages}
                  src='https://cdn3.iconfinder.com/data/icons/picons-social/57/06-facebook-512.png' />
              </a>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
      </Paper>
      </div>

    )
  }

const styles = {
  footerImages: {
    height: '50px',
    width: '50px'
  },
  footer: {
    position: 'fixed',
    left: '0',
    bottom: '0',
    right: '0',
    margin: '0',
    padding: '0',
  }
}

  export { Footer };
