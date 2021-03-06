import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
  Alert
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Header, List, ListItem, Icon } from "react-native-elements";
import { LOCK_LANDSCAPE, ADD_GAMEPAD } from "../constants";
import update from "immutability-helper";

import GamepadList from "./GamepadList";

import { initGamepad, editGamepad, saveGamepad, deleteGamepad } from "../actions";

class GamepadsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Gamepads"
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedGamepad: null,
      modalVisible: false,
      text: null
    };
  }

  onSelected = gamepad => {
    this.setState({ selectedGamepad: gamepad });
  };

  cleanSelectedGamepad = () => {
    this.setState({ selectedGamepad: null });
  };

  deleteGamepad = () => {
    Alert.alert(
      "Annuler",
      "Êtes-vous sur de vouloir supprimer le gamepad?",
      [
        {
          text: "Oui",
          onPress: () => {
            this.props.deleteGamepad(this.state.selectedGamepad);
            this.setState({ selectedGamepad: null });
          }
        },
        { text: "Non" }
      ]
    );
  };

  setModalVisible = visibility => {
    this.setState(update(this.state, {
      modalVisible: { $set: visibility }
    })
    );
  };

  saveGamepad = () => {
    var gamepad = this.props.gamepads.find(x => x.id === this.state.selectedGamepad.id);
    console.log(this.state);
    gamepad.name = this.state.text;
    const state = update(this.state, {
      selectedGamepad: { $set: null },
      modalVisible: { $set: false }
    });
    this.setState(state);
    this.props.saveGamepad(gamepad);
  };

  renderHeader = () => {
    if (this.state.selectedGamepad) {
      return (
        <Header backgroundColor="#5a83ce"
          leftComponent={<Icon style={styles.leftButton} name="arrow-back" size={30} color="#fff" onPress={this.cleanSelectedGamepad} />}
          centerComponent={{ text: this.state.selectedGamepad.name, style: { color: "#fff", fontSize: 18 } }}
          rightComponent={
            <View style={styles.edit}>
              <Icon style={styles.rightButton} name="create" size={30} color="#fff" onPress={() => this.setModalVisible(!this.state.modalVisible)} />
              <Icon style={styles.rightButton} name="delete" size={30} color="#fff" onPress={this.deleteGamepad} />
            </View>}
        />
      );
    } else {
      return (
        <Header
          backgroundColor="#5a83ce" centerComponent={{ text: "GAMEPADS", style: { color: "#fff", fontSize: 18 } }}
          rightComponent={<Icon style={styles.rightButton} name="add-circle-outline" size={30} color="#fff" onPress={this.createNewGamepad} />}
        />
      );
    }
  };

  renderEditModal = () => {
    const { selectedGamepad, modalVisible } = this.state;
    if (selectedGamepad) {
      return (
        <Modal
          style={{ flex: 1, backgroundColor: "white" }}
          supportedOrientations={["portrait", "landscape"]}
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => { }} >
          <View style={styles.modal}>
            <View>
              <Text>Modifier le nom du gamepad</Text>
              <TextInput style={{ height: 40 }} defaultValue={selectedGamepad.name}
                onChange={event => this.setState(update(this.state, { text: { $set: event.nativeEvent.text } }))}
                placeholder="Nom" autoCapitalize="none" autoCorrect={false} />
            </View>
            <View style={styles.actions}>
              <TouchableHighlight onPress={this.saveGamepad}>
                <Text>Valider</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                this.setState(update(this.state, { text: selectedGamepad.name }))
                this.setModalVisible(!modalVisible);
              }}>
                <Text>Annuler</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      );
    }
  };

  render() {
    return (
      <View style={styles.main}>
        {this.renderHeader()}
        <GamepadList selectedGamepad={this.state.selectedGamepad} navigation={this.props.navigation} style={styles.list} onSelected={this.onSelected} />
        {this.renderEditModal()}
      </View>
    );
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  createNewGamepad = () => {
    const newGamepad = initGamepad();
    this.props.navigation.dispatch(editGamepad(newGamepad));
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "Gamepad",
        params: { isInEdit: true, gamepad: newGamepad }
      })
    );
  };
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 70
  },
  list: {
    flex: 1,
    backgroundColor: "yellow"
  },
  edit: {
    flex: 1,
    flexDirection: "row"
  },
  leftButton: {
    alignSelf: "flex-start",
    padding: 0,
    marginTop: 0
  },
  rightButton: {
    alignSelf: "flex-end",
    padding: 0,
    marginTop: 0
  },
  header: {
    bottom: 0,
    paddingRight: 0
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "stretch",
    width: "50%"
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const mapStateToProps = state => ({
  gamepads: state.domain.gamepads
});

const mapDispatchToProps = dispatch => ({
  saveGamepad: gamepad => dispatch(saveGamepad(gamepad)),
  deleteGamepad: gamepad => dispatch(deleteGamepad(gamepad.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamepadsScreen);
