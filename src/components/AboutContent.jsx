import { Col, Container, Row } from "reactstrap";

import React from "react";

const AboutContent = () => {
	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="8">
					<h1>About My Gift Exchange Web App</h1>
					<h2>Background</h2>
					<p>
						I made this app for my family's gift exchange. It's
						pretty simple: you enter your name and create a
						password, and then you're taken to your profile page
						where you can see who you're buying a gift for and what
						they want.
					</p>
					<h2>Motivation</h2>
					<p>
						Could this have been done with pieces of paper and a
						hat? Yes. But where's the fun in that? I wanted to make
						a web app that used the technologies I've been learning
						and that was challenging enough to be interesting, but
						not so challenging that I'd never finish it. I also
						wanted to make something that would be useful, so making
						a gift exchange app for my family seemed worth trying.
					</p>
					<h2>Successes</h2>
					<p>
						I have used technologies like React, Reactstrap, and AWS
						to build other websites before, but this was my first
						attempt at building a full-stack web app that relies on
						serverless backend technologies. I was able to get the
						app working in a weekend, and it allowed me to utilize
						the technologies that I knew about with AWS in a
						controlled way.
					</p>
					<p>
						I was pleasantly surprised by how easy it was to get
						Lambda functions working for user validation. I was also
						surprised by how quickly I could get components created
						with the use of new AI tools. There were a few hiccups
						along the way, but using widely used technologies like
						React and Bootstrap made finding solutions to my
						problems relatively painless.
					</p>
					<h2>Future</h2>
					<p>
						In its current state, the app is tantalizingly close to being
						generalizable to any gift exchange. I would need to update 
						my architecture to use a real database instead of a JSON file, and 
						I would need to add a lot of endpoints and Lambda functions for 
						managing users and exchanges. I would also need to beef up the
						authentication in order to assure that the app is robust to 
						situations where users might actually want to break things. However,
						I think that the core functionality is there, and I'm excited to
						see where this project goes in the future.
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutContent;
