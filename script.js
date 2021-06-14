//VERIFICAÇÃO DE SUPORTE AO NAVEGADOR
if (navigator.getGamepads) {
  alert('Tem Suporte');
} else {
  alert('Não tem suporte');
}


//exibindo conexão e listando controles conectados
window.addEventListener("gamepadconnected", function (e) {
  alert('Gamepad Conectado');
  console.log("Gamepad conectado!", e.gamepad);
  var gamepads = navigator.getGamepads();
  console.log(gamepads);
});

//exibindo quebra de conexão 
window.addEventListener('gamepaddisconnected', function (e) {
  console.log('Gamepad desconectado!', e.gamepad);
  alert('Gamepad Desconectado');
});

//MAPEAMENTO DE TECLAS E SETAS DO CONTROLE DE PS3
const getArrows = () => {

  let ps3Arrows = new Array();
  ps3Arrows[0] = '>';
  ps3Arrows[1] = 'V';
  ps3Arrows[2] = '<';
  ps3Arrows[3] = '^';
  return ps3Arrows;
}

const getButtons = () => {

  let ps3Buttons = new Array();
  ps3Buttons[0] = '△',
    ps3Buttons[1] = 'O',
    ps3Buttons[2] = 'X',
    ps3Buttons[3] = '▀';
  ps3Buttons[4] = 'L1',
    ps3Buttons[5] = 'R1',
    ps3Buttons[6] = 'L2',
    ps3Buttons[7] = 'R2',
    ps3Buttons[8] = 'Select',
    ps3Buttons[9] = 'Start',
    ps3Buttons[10] = 'R3',
    ps3Buttons[11] = 'L3'

  return ps3Buttons
}
const gamepadDisplay = document.getElementById('gamepad-display');
//PEGANDO O DASHBOARD DE TECLAS PRESSIONADAS
const dashboardButtons = document.getElementById('pressed');

function atualizar() {



  const gamepads = navigator.getGamepads()
  const ps3Arrows = getArrows();
  const ps3Buttons = getButtons();

  if (gamepads[0]) {
    const gamepadState = {
      id: gamepads[0].id,
      axes: [
        gamepads[0].axes[0].toFixed(2),
        gamepads[0].axes[1].toFixed(2),
        gamepads[0].axes[2].toFixed(2),
        gamepads[0].axes[3].toFixed(2),
      ],
      buttons: [
        { button_0: gamepads[0].buttons[0].pressed },
        { button_1: gamepads[0].buttons[1].pressed },
        { button_2: gamepads[0].buttons[2].pressed },
        { button_3: gamepads[0].buttons[3].pressed },
        { button_4: gamepads[0].buttons[4].pressed },
        { button_5: gamepads[0].buttons[5].pressed },
        { button_6: gamepads[0].buttons[6].pressed },
        { button_7: gamepads[0].buttons[7].pressed },
        { button_8: gamepads[0].buttons[8].pressed },
        { button_9: gamepads[0].buttons[9].pressed },
        { button_10: gamepads[0].buttons[10].pressed },
        { button_11: gamepads[0].buttons[11].pressed },
      ]
    }

    if (gamepadState.axes[0].valueOf() == 1) {
      //ADICIONANDO VALOR DA TECLA QUE FOI PRESSIONADA SEGUINDO VALOR DO ARRAY 
      dashboardButtons.textContent = ps3Arrows[0];
    }
    if (gamepadState.axes[1].valueOf() == 1) {
      dashboardButtons.textContent = ps3Arrows[1];
    }
    if (gamepadState.axes[0].valueOf() == -1) {
      dashboardButtons.textContent = ps3Arrows[2];
    }
    if (gamepadState.axes[1].valueOf() == -1) {
      dashboardButtons.textContent = ps3Arrows[3];
    }

    ps3Buttons.forEach((item, index) => {
      if (gamepadState.buttons[index][`button_${index}`].valueOf()) {
        dashboardButtons.textContent = item;
      }
    })

    gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2);
  }
  //ATUALIZA DADOS DO <PRE> NO HTML (EX.: AO PRESSIONARMOS ALGUM BOTÃO ELE APARECE TRUE);
  window.requestAnimationFrame(atualizar);
}

window.requestAnimationFrame(atualizar);