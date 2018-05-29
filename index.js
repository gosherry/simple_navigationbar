import React from 'react'
import { View, Text, Image,
  TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import Tools from './tools'

export default class RRCustomNavigationBar extends React.Component {

  constructor(props) {
    super(props)
    this._backClickAction = this._backClickAction.bind(this)
    this._rightFirstLabelAction = this._rightFirstLabelAction.bind(this)
    this._rightSecondLabelAction = this._rightSecondLabelAction.bind(this)
  }

  static propTypes = {
    title: PropTypes.string,
    hiddenBackIcon: PropTypes.bool,
    hiddenBottomBorderLine: PropTypes.bool,
    backLabelAction: PropTypes.func,
    rightFirstLabelAction: PropTypes.func,
    rightSecondLabelAction: PropTypes.func,
    rightFirstLabel: PropTypes.string,
    rightSecondLabel: PropTypes.string,
  }

  static defaultProps = {
    hiddenBackIcon: false,
    hiddenBottomBorderLine: false,
  }

  _backClickAction() {
    if (this.props.backLabelAction) {
      this.props.backLabelAction()
    } else if (global.router) global.router.goBack()
  }

  _rightFirstLabelAction() {
    if (this.props.rightFirstLabelAction) this.props.rightFirstLabelAction()
  }

  _rightSecondLabelAction() {
    if (this.props.rightSecondLabelAction) this.props.rightSecondLabelAction()
  }

  render() {
    if (this.props.rightFirstLabel && this.props.rightFirstIcon) throw new Error('repeat label rightFirstLabel & rightFirstIcon')
    if (this.props.rightSecondLabel && this.props.rightSecondIcon) throw new Error('repeat label rightSecondLabel & rightSecondIcon')
    return (
      <View style={[styles.container, { borderBottomWidth: this.props.hiddenBottomBorderLine ? 0 : 1 }, this.props.container]}>
        <View style={[styles.containerWithoutStatusBar]}>
          <View style={[styles.cellContent, this.props.leftCellContent]}>
            { !this.props.hiddenBackIcon ?
                <TouchableOpacity
                  onPress={ this._backClickAction }
                  style={[styles.labelCommonContentStyle, styles.leftFirstIconLabelContentStyle]}>
                  <Image source={ this.props.backLabelIcon ? this.props.backLabelIcon : require('./ic_back.png') } style={[styles.leftFirstIconLabelStyle, this.props.backIconLabelStyle]} />
                </TouchableOpacity>
              : null
            }
          </View>

          <View style={[styles.cellContent, styles.centerCellContent, this.props.centerCellContent]}>
            { this.props.title ?
                <Text style={[styles.titleTextStyle, this.props.titleTextStyle]}>{ this.props.title }</Text>
              :
                <Image style={ this.props.titleImgStyle } source={ this.props.titleImgSource }/>
            }

          </View>
          <View style={[styles.cellContent, styles.rightCellContent, this.props.rightCellContent]}>
            { this.props.rightSecondIcon ?
                <TouchableOpacity
                  onPress={ this._rightSecondLabelAction }
                  style={[styles.labelCommonContentStyle, styles.rightSecondIconLabelContentStyle]}>
                  <Image source={ this.props.rightSecondIcon } style={[this.props.rightSecondLabelStyle]} />
                </TouchableOpacity>
              : null
            }
            { this.props.rightFirstIcon ?
                <TouchableOpacity
                  onPress={ this._rightFirstLabelAction }
                  style={[styles.labelCommonContentStyle, styles.rightFirstIconLabelContentStyle]}>
                  <Image source={ this.props.rightFirstIcon } style={[this.props.rightFirstLabelStyle]} />
                </TouchableOpacity>
              : null
            }
            { this.props.rightSecondLabel ?
                <TouchableOpacity
                  onPress={ this._rightSecondLabelAction }
                  style={[styles.labelCommonContentStyle, styles.rightSecondIconLabelContentStyle, { paddingRight: 5 }]}>
                  <Text style={[styles.labelText, this.props.rightSecondLabelStyle]}>{ this.props.rightSecondLabel }</Text>
                </TouchableOpacity>
              : null
            }
            { this.props.rightFirstLabel ?
                <TouchableOpacity
                  onPress={ this._rightSecondLabelAction }
                  style={[styles.labelCommonContentStyle, styles.rightSecondIconLabelContentStyle, { paddingLeft: 5 }]}>
                  <Text style={[styles.labelText, this.props.rightFirstLabelStyle]}>{ this.props.rightFirstLabel }</Text>
                </TouchableOpacity>
              : null
            }
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: Tools.SCREEN_WIDTH,
    ...Platform.select({
      android: {
        height: Tools.NAVIGATIONBAR_WIDTH_ANDROID,
      },
      ios: {
        height: Tools.NAVIGATIONBAR_WIDTH_IOS,
        paddingTop: Tools.NAVIGATIONBAR_PADDING_TOP_IOS
      }
    }),
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    backgroundColor: 'white'
  },
  containerWithoutStatusBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellContent: {
    flex: 1,
    ...Platform.select({
      android: {
        height: Tools.NAVIGATIONBAR_WIDTH_ANDROID,
      },
      ios: {
        height: Tools.NAVIGATIONBAR_WIDTH_IOS - Tools.NAVIGATIONBAR_PADDING_TOP_IOS,
      }
    }),
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerCellContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelCommonContentStyle: {
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: Tools.NAVIGATIONBAR_WIDTH_ANDROID,
      },
      ios: {
        height: Tools.NAVIGATIONBAR_WIDTH_IOS - Tools.NAVIGATIONBAR_PADDING_TOP_IOS,
      }
    }),
  },
  leftFirstIconLabelContentStyle: {
    paddingLeft: 15,
    paddingRight: 10
  },
  leftFirstIconLabelStyle: {
    width: 20,
    height: 20,
  },
  titleTextStyle: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.85)'
  },
  rightCellContent: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightFirstIconLabelContentStyle: {
    paddingRight: 15,
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  rightSecondIconLabelContentStyle: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingLeft: 15,
  },
  labelText: {
    fontSize: 15,
  }
})
