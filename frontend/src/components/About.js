import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      {/* Page Heading */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-10 text-center">
          <h2 className="fw-bold text-primary">About iNotebook</h2>
          <p className="lead">
            iNotebook is a modern and secure note-taking app built using React for frontend and Node.js for backend. It helps you store, edit, and manage your notes easily and securely.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <i className="fas fa-lock fa-2x text-success mb-2"></i>
          <h5>Secure</h5>
          <p>Your notes are encrypted and protected. Only you can access them.</p>
        </div>
        <div className="col-md-4">
          <i className="fas fa-mobile-alt fa-2x text-info mb-2"></i>
          <h5>Responsive</h5>
          <p>Use it on mobile, tablet, or desktop — iNotebook works everywhere!</p>
        </div>
        <div className="col-md-4">
          <i className="fas fa-cloud-upload-alt fa-2x text-warning mb-2"></i>
          <h5>Cloud-Based</h5>
          <p>Your notes are stored in the cloud — access anytime, anywhere.</p>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h4 className="text-secondary mb-3">Technologies Used</h4>
          <ul className="list-inline">
            <li className="list-inline-item badge bg-dark m-1">React</li>
            <li className="list-inline-item badge bg-dark m-1">Node.js</li>
            <li className="list-inline-item badge bg-dark m-1">Express</li>
            <li className="list-inline-item badge bg-dark m-1">MongoDB</li>
            <li className="list-inline-item badge bg-dark m-1">Bootstrap</li>
            <li className="list-inline-item badge bg-dark m-1">JWT Auth</li>
          </ul>
        </div>
      </div>

      {/* Contact/Feedback */}
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h5 className="mb-3">Have feedback or suggestions?</h5>
          <p>We’d love to hear from you! Email us at <strong>support@NoteNest.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default About;
