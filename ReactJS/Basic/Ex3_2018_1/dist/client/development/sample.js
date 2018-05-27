/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/development/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/pages/sample/components/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/react-dom/index.js":
/*!**************************************************************************************************!*\
  !*** delegated ./node_modules/react-dom/index.js from dll-reference vendor_41d63c80d45a067fdb2b ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_41d63c80d45a067fdb2b */ \"dll-reference vendor_41d63c80d45a067fdb2b\"))(\"./node_modules/react-dom/index.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/react-dom/index.js_from_dll-reference_vendor_41d63c80d45a067fdb2b?");

/***/ }),

/***/ "./node_modules/react-redux/es/index.js":
/*!*******************************************************************************************************!*\
  !*** delegated ./node_modules/react-redux/es/index.js from dll-reference vendor_41d63c80d45a067fdb2b ***!
  \*******************************************************************************************************/
/*! exports provided: Provider, createProvider, connectAdvanced, connect */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_41d63c80d45a067fdb2b */ \"dll-reference vendor_41d63c80d45a067fdb2b\"))(\"./node_modules/react-redux/es/index.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/react-redux/es/index.js_from_dll-reference_vendor_41d63c80d45a067fdb2b?");

/***/ }),

/***/ "./node_modules/react/index.js":
/*!**********************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference vendor_41d63c80d45a067fdb2b ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_41d63c80d45a067fdb2b */ \"dll-reference vendor_41d63c80d45a067fdb2b\"))(\"./node_modules/react/index.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/react/index.js_from_dll-reference_vendor_41d63c80d45a067fdb2b?");

/***/ }),

/***/ "./node_modules/redux-thunk/lib/index.js":
/*!********************************************************************************************************!*\
  !*** delegated ./node_modules/redux-thunk/lib/index.js from dll-reference vendor_41d63c80d45a067fdb2b ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_41d63c80d45a067fdb2b */ \"dll-reference vendor_41d63c80d45a067fdb2b\"))(\"./node_modules/redux-thunk/lib/index.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/redux-thunk/lib/index.js_from_dll-reference_vendor_41d63c80d45a067fdb2b?");

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!*************************************************************************************************!*\
  !*** delegated ./node_modules/redux/es/redux.js from dll-reference vendor_41d63c80d45a067fdb2b ***!
  \*************************************************************************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_41d63c80d45a067fdb2b */ \"dll-reference vendor_41d63c80d45a067fdb2b\"))(\"./node_modules/redux/es/redux.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/redux/es/redux.js_from_dll-reference_vendor_41d63c80d45a067fdb2b?");

/***/ }),

/***/ "./source/actions/sampleAction.js":
/*!****************************************!*\
  !*** ./source/actions/sampleAction.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.addSample = undefined;\n\nvar _types = __webpack_require__(/*! ./types */ \"./source/actions/types.js\");\n\nvar addSample = exports.addSample = function addSample(data) {\n    return {\n        type: _types.ADD_SAMPLE,\n        data: data\n    };\n};\n\n//# sourceURL=webpack:///./source/actions/sampleAction.js?");

/***/ }),

/***/ "./source/actions/types.js":
/*!*********************************!*\
  !*** ./source/actions/types.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* Sample */\nvar ADD_SAMPLE = exports.ADD_SAMPLE = \"ADD_SAMPLE\";\nvar GET_SAMPLE = exports.GET_SAMPLE = \"GET_SAMPLE\";\n\n//# sourceURL=webpack:///./source/actions/types.js?");

/***/ }),

/***/ "./source/layouts/AppLayout.jsx":
/*!**************************************!*\
  !*** ./source/layouts/AppLayout.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AppLayout = function (_Component) {\n  _inherits(AppLayout, _Component);\n\n  function AppLayout(props) {\n    _classCallCheck(this, AppLayout);\n\n    return _possibleConstructorReturn(this, (AppLayout.__proto__ || Object.getPrototypeOf(AppLayout)).call(this, props));\n  }\n\n  _createClass(AppLayout, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        { id: 'container', className: 'container main-container' },\n        this.props.children\n      );\n    }\n  }]);\n\n  return AppLayout;\n}(_react.Component);\n\nexports.default = AppLayout;\n\n//# sourceURL=webpack:///./source/layouts/AppLayout.jsx?");

/***/ }),

/***/ "./source/modules/createReducer.js":
/*!*****************************************!*\
  !*** ./source/modules/createReducer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = createReducer;\nfunction createReducer(initialState, handlers) {\n    return function reducer() {\n        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n        var action = arguments[1];\n\n        if (handlers.hasOwnProperty(action.type)) {\n            return handlers[action.type](state, action);\n        } else {\n            return state;\n        }\n    };\n}\n\n//# sourceURL=webpack:///./source/modules/createReducer.js?");

/***/ }),

/***/ "./source/pages/sample/actions/filterAction.js":
/*!*****************************************************!*\
  !*** ./source/pages/sample/actions/filterAction.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toggleSample = undefined;\n\nvar _types = __webpack_require__(/*! ./types */ \"./source/pages/sample/actions/types.js\");\n\nvar toggleSample = exports.toggleSample = function toggleSample(data) {\n  return {\n    type: _types.TOGGLE_SAMPLE,\n    data: data\n  };\n};\n\n//# sourceURL=webpack:///./source/pages/sample/actions/filterAction.js?");

/***/ }),

/***/ "./source/pages/sample/actions/index.js":
/*!**********************************************!*\
  !*** ./source/pages/sample/actions/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _filterAction = __webpack_require__(/*! ./filterAction */ \"./source/pages/sample/actions/filterAction.js\");\n\nvar filterAction = _interopRequireWildcard(_filterAction);\n\nvar _sampleAction = __webpack_require__(/*! ../../../actions/sampleAction */ \"./source/actions/sampleAction.js\");\n\nvar sampleAction = _interopRequireWildcard(_sampleAction);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.default = _extends({}, filterAction, sampleAction);\n\n//# sourceURL=webpack:///./source/pages/sample/actions/index.js?");

/***/ }),

/***/ "./source/pages/sample/actions/types.js":
/*!**********************************************!*\
  !*** ./source/pages/sample/actions/types.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar TOGGLE_SAMPLE = exports.TOGGLE_SAMPLE = 'TOGGLE_SAMPLE';\n\n//# sourceURL=webpack:///./source/pages/sample/actions/types.js?");

/***/ }),

/***/ "./source/pages/sample/components/AppContainer.jsx":
/*!*********************************************************!*\
  !*** ./source/pages/sample/components/AppContainer.jsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _AppLayout = __webpack_require__(/*! ../../../layouts/AppLayout */ \"./source/layouts/AppLayout.jsx\");\n\nvar _AppLayout2 = _interopRequireDefault(_AppLayout);\n\nvar _Filter = __webpack_require__(/*! ./Filter */ \"./source/pages/sample/components/Filter.jsx\");\n\nvar _Filter2 = _interopRequireDefault(_Filter);\n\nvar _Content = __webpack_require__(/*! ./Content */ \"./source/pages/sample/components/Content.jsx\");\n\nvar _Content2 = _interopRequireDefault(_Content);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AppContainer = function (_Component) {\n  _inherits(AppContainer, _Component);\n\n  function AppContainer(props) {\n    _classCallCheck(this, AppContainer);\n\n    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));\n  }\n\n  _createClass(AppContainer, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        _AppLayout2.default,\n        null,\n        _react2.default.createElement(_Filter2.default, null),\n        _react2.default.createElement(_Content2.default, null)\n      );\n    }\n  }]);\n\n  return AppContainer;\n}(_react.Component);\n\nexports.default = (0, _reactRedux.connect)()(AppContainer);\n\n//# sourceURL=webpack:///./source/pages/sample/components/AppContainer.jsx?");

/***/ }),

/***/ "./source/pages/sample/components/Content.jsx":
/*!****************************************************!*\
  !*** ./source/pages/sample/components/Content.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _actions = __webpack_require__(/*! ../actions */ \"./source/pages/sample/actions/index.js\");\n\nvar _actions2 = _interopRequireDefault(_actions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Content = function (_Component) {\n  _inherits(Content, _Component);\n\n  function Content(props) {\n    _classCallCheck(this, Content);\n\n    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));\n  }\n\n  _createClass(Content, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        \"div\",\n        {\n          className: \"content-container\",\n          style: { display: this.props.isChecked ? \"block\" : \"none\" }\n        },\n        _react2.default.createElement(\n          \"p\",\n          null,\n          \"Sample Data\"\n        ),\n        _react2.default.createElement(\n          \"ul\",\n          { className: \"sample-list\" },\n          this.props.sampleList.map(function (item, i) {\n            return _react2.default.createElement(\n              \"li\",\n              { key: i },\n              item\n            );\n          })\n        )\n      );\n    }\n  }]);\n\n  return Content;\n}(_react.Component);\n\nfunction mapStateToProps(state) {\n  return Object.assign({}, {\n    isChecked: state.isChecked,\n    sampleList: state.sampleList\n  });\n}\n\nfunction mapDispatchToProps(dispatch) {\n  var addSample = _actions2.default.addSample;\n\n  return (0, _redux.bindActionCreators)({ addSample: addSample }, dispatch);\n}\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Content);\n\n//# sourceURL=webpack:///./source/pages/sample/components/Content.jsx?");

/***/ }),

/***/ "./source/pages/sample/components/Filter.jsx":
/*!***************************************************!*\
  !*** ./source/pages/sample/components/Filter.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _actions = __webpack_require__(/*! ../actions */ \"./source/pages/sample/actions/index.js\");\n\nvar _actions2 = _interopRequireDefault(_actions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Filter = function (_Component) {\n  _inherits(Filter, _Component);\n\n  function Filter(props) {\n    _classCallCheck(this, Filter);\n\n    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));\n\n    _this.onCheckBoxChange = function () {\n      var newState = !_this.props.isChecked;\n      _this.props.toggleSample(newState);\n    };\n\n    _this.addSample = function () {\n      var newSampleList = [].concat(_toConsumableArray(_this.props.sampleList), [\"sample \" + ++_this.props.sampleList.length]);\n      console.log(newSampleList);\n      _this.props.addSample(newSampleList);\n    };\n\n    return _this;\n  }\n\n  _createClass(Filter, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        \"div\",\n        { className: \"filter-container\" },\n        _react2.default.createElement(\n          \"div\",\n          null,\n          _react2.default.createElement(\n            \"label\",\n            null,\n            _react2.default.createElement(\"input\", {\n              type: \"checkbox\",\n              checked: this.props.isChecked,\n              onChange: this.onCheckBoxChange\n            }),\n            \"Toggle Samle\"\n          ),\n          _react2.default.createElement(\n            \"button\",\n            { type: \"button\", onClick: this.addSample },\n            \"Add Sample\"\n          )\n        )\n      );\n    }\n  }]);\n\n  return Filter;\n}(_react.Component);\n\nfunction mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)(_actions2.default, dispatch);\n}\n\nfunction mapStateToProps(state) {\n  return Object.assign({}, { isChecked: state.isChecked, sampleList: state.sampleList });\n}\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Filter);\n\n//# sourceURL=webpack:///./source/pages/sample/components/Filter.jsx?");

/***/ }),

/***/ "./source/pages/sample/components/index.jsx":
/*!**************************************************!*\
  !*** ./source/pages/sample/components/index.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/lib/index.js\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reducers = __webpack_require__(/*! ../reducers */ \"./source/pages/sample/reducers/index.js\");\n\nvar _reducers2 = _interopRequireDefault(_reducers);\n\nvar _AppContainer = __webpack_require__(/*! ./AppContainer */ \"./source/pages/sample/components/AppContainer.jsx\");\n\nvar _AppContainer2 = _interopRequireDefault(_AppContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar defaultState = Object.assign({}, {\n  sampleList: [\"sample 1\", \"sample 2\", \"sample 3\"],\n  isChecked: false\n});\n\nfunction configureStore(initialState) {\n  var enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default // lets us dispatch() functions\n  ));\n\n  return (0, _redux.createStore)(_reducers2.default, initialState, enhancer);\n}\n\nvar store = configureStore(defaultState);\n\nvar App = function (_React$Component) {\n  _inherits(App, _React$Component);\n\n  function App(props) {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\n        _reactRedux.Provider,\n        { store: store },\n        _react2.default.createElement(_AppContainer2.default, null)\n      );\n    }\n  }]);\n\n  return App;\n}(_react2.default.Component);\n\nexports.default = App;\n\n\n_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById(\"app-container\"));\n\n//# sourceURL=webpack:///./source/pages/sample/components/index.jsx?");

/***/ }),

/***/ "./source/pages/sample/reducers/filterReducer.js":
/*!*******************************************************!*\
  !*** ./source/pages/sample/reducers/filterReducer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isChecked = undefined;\n\nvar _createReducer2 = __webpack_require__(/*! ../../../modules/createReducer */ \"./source/modules/createReducer.js\");\n\nvar _createReducer3 = _interopRequireDefault(_createReducer2);\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./source/pages/sample/actions/types.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar isChecked = exports.isChecked = (0, _createReducer3.default)({}, _defineProperty({}, _types.TOGGLE_SAMPLE, function (state, action) {\n  return action.data;\n}));\n\n//# sourceURL=webpack:///./source/pages/sample/reducers/filterReducer.js?");

/***/ }),

/***/ "./source/pages/sample/reducers/index.js":
/*!***********************************************!*\
  !*** ./source/pages/sample/reducers/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _sampleReducer = __webpack_require__(/*! ../../../reducers/sampleReducer */ \"./source/reducers/sampleReducer.js\");\n\nvar sampleReducer = _interopRequireWildcard(_sampleReducer);\n\nvar _filterReducer = __webpack_require__(/*! ./filterReducer */ \"./source/pages/sample/reducers/filterReducer.js\");\n\nvar filterReducer = _interopRequireWildcard(_filterReducer);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.default = (0, _redux.combineReducers)(_extends({}, sampleReducer, filterReducer));\n\n//# sourceURL=webpack:///./source/pages/sample/reducers/index.js?");

/***/ }),

/***/ "./source/reducers/sampleReducer.js":
/*!******************************************!*\
  !*** ./source/reducers/sampleReducer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.sampleList = undefined;\n\nvar _createReducer;\n\nvar _types = __webpack_require__(/*! ../actions/types */ \"./source/actions/types.js\");\n\nvar _createReducer2 = __webpack_require__(/*! ../modules/createReducer.js */ \"./source/modules/createReducer.js\");\n\nvar _createReducer3 = _interopRequireDefault(_createReducer2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar sampleList = exports.sampleList = (0, _createReducer3.default)({}, (_createReducer = {}, _defineProperty(_createReducer, _types.GET_SAMPLE, function (state, action) {\n  return action.data;\n}), _defineProperty(_createReducer, _types.ADD_SAMPLE, function (state, action) {\n  return action.data;\n}), _createReducer));\n\n//# sourceURL=webpack:///./source/reducers/sampleReducer.js?");

/***/ }),

/***/ "dll-reference vendor_41d63c80d45a067fdb2b":
/*!**********************************************!*\
  !*** external "vendor_41d63c80d45a067fdb2b" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor_41d63c80d45a067fdb2b;\n\n//# sourceURL=webpack:///external_%22vendor_41d63c80d45a067fdb2b%22?");

/***/ })

/******/ });
//# sourceMappingURL=sample.js.map