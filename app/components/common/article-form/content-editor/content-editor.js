import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Quill from "quill";

import "./content-editor.scss";

class ContentEditor extends React.Component {

	static propTypes = {
		content: PropTypes.string.isRequired,
		isInvalid: PropTypes.bool.isRequired,
		onUpdate: PropTypes.func.isRequired,
		onFocus: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {};
		this.editor;

		this.options = {
			modules: {
				toolbar: ".toolbar-container"
			},
			placeholder: "Content",
			readOnly: false,
			theme: "snow"
		};

		//need to manually whitelist the font sizes
		var fontSizeStyle = Quill.import("attributors/style/size");
		fontSizeStyle.whitelist = ["11px", "16px", "24px", "34px"];
		Quill.register(fontSizeStyle, true);

		//use align css instead of classes
		var alignStyle = Quill.import("attributors/style/align");
		Quill.register(alignStyle, true);

		//use font style css instead of classes
		var fontStyle = Quill.import("attributors/style/font");
		Quill.register(fontStyle, true);
	}

	componentDidMount(){
		//initialize the quill editor and set it's HTML content if there is any
		this.editor = new Quill($(this.refs.editor)[0], this.options);

		var qlEditor = $(this.refs.editor).find(".ql-editor");
		qlEditor.html(this.props.content);

		//on text change call the onUpdate function to pass the updated content back to the parent component
		this.editor.on("text-change", (delta, oldDelta, source) => {
			var content = qlEditor.html();
			this.props.onUpdate(content);
		});

		//on focus call the focus function (create a fake event with the correct structure so it can be handled by the clearErrors function correctly)
		qlEditor.on("focus", () => {
			var fakeEvent = {
				target: {
					name: "content"
				}
			};

			this.props.onFocus(fakeEvent);
		});
	}
		
	render() {
		return (
			<div className={classNames("content-editor", {"is-invalid": this.props.isInvalid})}>

				<div className="toolbar-container">

					<span className="ql-formats">
						{/* those values need to be "whitelisted" in the javascript code first... */}
						<select className="ql-size" defaultValue="16px">
							<option value="11px">Small</option>
							<option value="16px">Medium</option>
							<option value="24px">Large</option>
							<option value="34px">Huge</option>
						</select>
					</span>

					<span className="ql-formats">
						<select className="ql-color">
							<option value="rgb(0, 0, 0)" />
							<option value="rgb(230, 0, 0)" />
							<option value="rgb(255, 153, 0)" />
							<option value="rgb(255, 255, 0)" />
							<option value="rgb(0, 138, 0)" />
							<option value="rgb(0, 102, 204)" />
							<option value="rgb(153, 51, 255)" />
							<option value="rgb(255, 255, 255)" />
							<option value="rgb(250, 204, 204)" />
							<option value="rgb(255, 235, 204)" />
							<option value="rgb(204, 224, 245)" />
							<option value="rgb(235, 214, 255)" />
							<option value="rgb(187, 187, 187)" />
							<option value="rgb(102, 185, 102)" />
						</select>

						<select className="ql-background">
							<option value="rgb(0, 0, 0)" />
							<option value="rgb(230, 0, 0)" />
							<option value="rgb(255, 153, 0)" />
							<option value="rgb(255, 255, 0)" />
							<option value="rgb(0, 138, 0)" />
							<option value="rgb(0, 102, 204)" />
							<option value="rgb(153, 51, 255)" />
							<option value="rgb(255, 255, 255)" />
							<option value="rgb(250, 204, 204)" />
							<option value="rgb(255, 235, 204)" />
							<option value="rgb(204, 224, 245)" />
							<option value="rgb(235, 214, 255)" />
							<option value="rgb(187, 187, 187)" />
							<option value="rgb(102, 185, 102)" />
						</select>
					</span>

					<span className="ql-formats">
						<button className="ql-bold" type="button"></button>
						<button className="ql-italic" type="button"></button>
						<button className="ql-underline" type="button"></button>
						<button className="ql-strike" type="button"></button>
					</span>

					<span className="ql-formats">
						<button className="ql-header" value="1" type="button"></button>
						<button className="ql-header" value="2" type="button"></button>

						<button className="ql-blockquote" type="button"></button>
					</span>

					<span className="ql-formats">
						<button className="ql-list" value="ordered" type="button"></button>
						<button className="ql-list" value="bullet" type="button"></button>

						<button className="ql-indent" value="-1" type="button"></button>
						<button className="ql-indent" value="+1" type="button"></button>
					</span>

					<span className="ql-formats">
						<select className="ql-align">
							<option></option>
							<option value="center"></option>
							<option value="right"></option>
							<option value="justify"></option>
						</select>
					</span>

					<span className="ql-formats">
						<button className="ql-link" type="button"></button>
						<button className="ql-video" type="button"></button>
					</span>

					<span className="ql-formats">
						<button className="ql-clean" type="button"></button>
					</span>
				</div>

				<div ref="editor" className="editor-container"></div>

			</div>
		);
	}
};

export default ContentEditor;