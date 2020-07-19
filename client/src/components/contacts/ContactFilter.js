import React, { useContext, useRef, useEffect, useState } from "react";
import {
	Button,
	InputGroup,
	InputGroupAddon,
	Input,
	Tooltip,
} from "reactstrap";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = ({ toggleModal }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const contactContext = useContext(ContactContext);
	const text = useRef("");

	const { filterContact, clearFilter, filtered } = contactContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = "";
		}
	});

	const onChange = (e) => {
		if (text.current.value !== "") {
			filterContact(e.target.value);
		} else {
			clearFilter();
		}
	};

	const toggle = () => setTooltipOpen(!tooltipOpen);

	return (
		<div className="float-right mt-5 pr-6">
			<Tooltip
				placement="left"
				isOpen={tooltipOpen}
				target="add-new-contact"
				toggle={toggle}
			>
				Add new contact
			</Tooltip>
			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<Button
						size="sm"
						color="primary"
						id="add-new-contact"
						onClick={toggleModal}
						className="bg-color"
					>
						<i className="fas fa-user-plus"></i>
					</Button>
				</InputGroupAddon>
				<Input
					innerRef={text}
					onChange={onChange}
					type="text"
					placeholder="Search Contacts..."
				/>
			</InputGroup>
		</div>
	);
};

export default ContactFilter;
