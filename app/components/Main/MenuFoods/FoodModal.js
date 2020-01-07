import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {foodImageUrl} from '../../../constants/urlDefine';

const {width, height} = Dimensions.get('window');

class FoodModal extends Component {
  render() {
    const {modalWrapper, modalInner, image, closeIcon} = styles;
    let {imageName} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isModalVisible}>
        <View style={modalWrapper}>
          <View style={modalInner}>
            <Image
              style={image}
              source={{
                uri: foodImageUrl(imageName),
              }}
            />
            <View style={closeIcon}>
              <Icon
                name="times"
                type="font-awesome"
                color="#FFF"
                size={30}
                onPress={this.props.closeModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: '#000',
    opacity: 0.9,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default FoodModal;
