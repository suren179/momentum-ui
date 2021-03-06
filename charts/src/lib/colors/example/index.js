import MomentumCharts from '../../index.js';

const gBoard = function (num, colorPersets, root) {
  let p = document.createElement('p');
  p.innerHTML = colorPersets + ' with ' + num + ' colors';
  root.append(p);
  return new MomentumCharts.Board('#app', {
    attr: {
      width: '800',
      height: '100',
      viewBox: "0 0 800 100"
    },
    style: {
      'margin': '7px 0 14px 0'
    }
  });
};

const gData = function (l) {
  let a = [];
  for (var i = 0; i < l; i++) {
    a.push(360);
  }
  return a;
};

const regHsl = /Hsl$/;
const displayColor = function (num, colorPersets, root) {
  let colorsSet = new MomentumCharts.Colors(colorPersets),
    colors = colorsSet.scheme(num),
    data = gData(num),
    board = gBoard(num, colorPersets, root),
    step = (800 - 20) / num >> 0;
  if (regHsl.test(colorPersets)) {
    root.append(document.createElement('HR'));
  }
  board.data(data);
  board.rect({
    generator: {
      x: function (d, i) {
        return 10 + step * i;
      },
      y: function (d) {
        return 100 - d;
      },
      h: function (d) {
        return d;
      },
      w: 12
    },
    modify: {
      attr: {
      },
      style: {
        fill: function (d, i) {
          return colors[i].toString();
        },
        'stroke-width': 3
      }
    }
  });
  board.render();
};

const example = () => {
  const root = document.getElementById('app');
  const presets = MomentumCharts.Colors.allPersets();
  for (let name in presets) {
    displayColor(40, name, root);
    break; // cancel to show all colors
  }
};

export default example;
