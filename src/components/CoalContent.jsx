import "bootstrap-icons/font/bootstrap-icons.css";

import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from "reactstrap";

import React from "react";
import coalImage from "../assets/images/Coal.jpeg";
import listImage from "../assets/images/List.png";
import rockImage from "../assets/images/Rock.jpeg";
import { useLocation } from "react-router-dom";

const CoalContent = () => {
	const location = useLocation();
	const { list_owner } = location.state || {};

	return (
		<Container>
			<h1 className="text-center">{list_owner}'s Wishlist!</h1>
			<Row>
				<Col md={4}>
					<Card>
						<CardImg
							top
							src={coalImage}
							alt="Coal"
							className="rounded-circle"
						/>
						<CardBody>
							<CardTitle>
								<strong>Coal</strong>
							</CardTitle>
							<CardText>
								Coal is a combustible black or brownish-black
								sedimentary rock, formed as rock strata called
								coal seams. They're a great gift idea for{" "}
								{list_owner}
							</CardText>
						</CardBody>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<CardImg
							top
							width="100%"
							src={rockImage}
							alt="Rock"
							className="rounded-circle"
						/>
						<CardBody>
							<CardTitle>
								<strong>A Cool Rock</strong>
							</CardTitle>
							<CardText>
								A rock is any naturally occurring solid mass or
								aggregate of minerals or mineraloid matter.{" "}
								{list_owner} would love to have one.
							</CardText>
						</CardBody>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<CardImg
							top
							width="100%"
							src={listImage}
							alt="List"
							className="rounded-circle"
						/>
						<CardBody>
							<CardTitle>
								<strong>A Better Wishlist</strong>
							</CardTitle>
							<CardText>
								Because no one provided a wishlist for{" "}
								{list_owner}
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default CoalContent;
