/*
 * @Description: 自定义指令实现水印
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-11-26 13:30:36
 * @LastEditors: 天生不是宠儿
 */
/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果

  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

function addWaterMarker(str: string, parentNode: { appendChild: (arg0: HTMLCanvasElement) => void; style: { backgroundImage: string; }; }, font: string, textColor: string) {
    // 水印文字，父元素，字体，文字颜色
    var can = document.createElement('canvas');

    parentNode.appendChild(can);
    can.width = 200;
    can.height = 150;
    can.style.display = 'none';
    let cans: any = can.getContext('2d');

    cans.rotate(-20 * Math.PI / 180);
    cans.font = font || '16px Microsoft JhengHei';
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
    cans.textAlign = 'left';
    cans.textBaseline = 'Middle';
    cans.fillText(str, can.width / 3, can.height / 2);
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}
const waterMarker = {
    'beforeMount': function (el: { appendChild: (arg0: HTMLCanvasElement) => void; style: { backgroundImage: string; }; }, binding: { value: { text: string; font: string; textColor: string; }; }) {
        addWaterMarker(
            binding.value.text,
            el,
            binding.value.font,
            binding.value.textColor
        );
    }
};

export default waterMarker;
