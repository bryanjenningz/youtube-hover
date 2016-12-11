import React from 'react'

const PopupTranslation = ({showTranslation, translation, setHoverIndex, addCard}) =>
  showTranslation ?
    <span
      style={{
        position: 'absolute',
        top: 20,
        left: -180,
        width: 400,
        padding: 10
      }}
      className="hovering">
      <div className="pull-right">
        <button
          className="btn btn-default btn-xs"
          onClick={() => setHoverIndex(-1)}>
          <i className="glyphicon glyphicon-remove" />
        </button>
      </div>
      {translation.slice(0, 5).map((translationEntry, translationIndex) =>
        <div key={translationIndex}>
          <button
            className="btn btn-default btn-xs"
            onClick={() => addCard(translationIndex)}>
            <i className="glyphicon glyphicon-plus" />
          </button>
          {translationEntry}
        </div>
      )}
    </span> :
    null

export default PopupTranslation
