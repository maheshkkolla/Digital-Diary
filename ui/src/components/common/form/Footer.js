import React from "react";
import "./footer.scss";

export default class Footer extends React.Component {

  constructor() {
    super();
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  getCancelContent() {
    return (this.props.cancelBtn) ? this.props.cancelBtn : "Cancel";
  }

  getSaveContent() {
    return (this.props.saveBtn && this.props.saveBtn.content)
      ? this.props.saveBtn.content
      : "Save";
  }

  getCancelBtnStyle() {
    return this.props.cancelColor ? {color: this.props.cancelColor} : {};
  }

  getSaveBtnStyle() {
    return this.props.saveColor ? {color: this.props.saveColor} : {};
  }

  onCancel() {
    if(this.props.cancelBtn && this.props.cancelBtn.onClick) {
      this.props.cancelBtn.onClick();
    }

    (this.props.onCancel) && this.props.onCancel();
  }

  getCancelBtn() {
    return (this.props.noCancel)
      ? <sapn/>
      : (<button className="cancel-btn" style={this.getCancelBtnStyle()} onClick={this.onCancel}>
          {this.getCancelContent()}
        </button>);
  }

  onSave() {
    if(this.props.saveBtn && this.props.saveBtn.onClick) {
      this.props.saveBtn.onClick();
    }

    (this.props.onSave) && this.props.onSave();
  }

  getSaveBtn() {
    return (
      <button className="save-btn" style={this.getSaveBtnStyle()} onClick={this.onSave}>
        {this.getSaveContent()}
      </button>
    );
  }

  render() {
    return(
      <div className="footer">
        {this.getCancelBtn()}
        {this.getSaveBtn()}
      </div>
    );
  }
}