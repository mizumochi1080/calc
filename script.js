/*
flg = "zero-ok":
"0"や"00"を計算画面の最後に加えることがOKな状態
且つ、1～9を計算画面の最後に加えるときに、1文字削除せずに追加する状態
且つ、算術記号を計算画面の最後に加えることがOKな状態
例：
0を追加：1 → 10
00を追加：123 → 12300
1を追加：753 → 7531
+を追加：300 → 300+


flg = "zero-ng":
"0"や"00"を計算画面の最後に加えることがNGな状態
且つ、1～9を計算画面の最後に加えるときに、1文字削除して追加する状態
且つ、算術記号を計算画面の最後に加えることがOKな状態
例：
1を追加：0 → 1
1を追加：1+0 → 1+1
+を追加：0 → 0+


flg = "calc":
"0"や"00"を計算画面の最後に加える場合、どちらも"0"を追加する状態
且つ、1～9を計算画面の最後に加えるときに、1文字削除せずに追加する状態
且つ、算術記号を計算画面の最後に加えるときに、1文字削除して追加する状態
例：
+を追加：1 → 1+
+を追加：0 → 0+
+を追加：1+ → 1+
+を追加：1- → 1+
*/

const DIGIT_LIMIT = 14;

// 桁数判定
function digit(n) {
    if (n > DIGIT_LIMIT) {
        return false;
    } else {
        return true;
    }
}

// 画面の最後の1文字削除
function disp_final_delete(display) {
    display = display.split("");
    display.pop();
    display = display.join("");
    return display;
}

$(function () {
    let display = "0";
    let flg = "zero-ng";
    let digit_flg = true;

    // AC
    $(".ac").click(function () {
        $(".disp").text("0");
        display = "0";
        flg = "zero-ng";
        digit_flg = true;
    });

    // 00
    $(".num00").click(function () {
        digit_flg = digit(display.length);
        if (digit_flg) {
            if (flg == "zero-ok") {
                $(".disp").text(display + "00");
                display += "00";
            } else if (flg == "calc") {
                $(".disp").text(display + "0");
                display += "0";
                flg = "zero-ng";
            }
        }
    });

    // 0
    $(".num0").click(function () {
        digit_flg = digit(display.length);
        if (digit_flg) {
            if (flg == "zero-ok") {
                $(".disp").text(display + "0");
                display += "0";
            } else if (flg == "calc") {
                $(".disp").text(display + "0");
                display += "0";
                flg = "zero-ng";
            }
        }
    });

    // 1-9
    $(".num").click(function () {
        digit_flg = digit(display.length);
        if (digit_flg) {
            let input = $(this).text();
            if (flg == "zero-ng") {
                display = disp_final_delete(display);
            }
            $(".disp").text(display + input);
            display += input;
            flg = "zero-ok";
        }
    });

    // + - * /
    $(".calc").click(function () {
        if (display != "0") {
            let input = $(this).text();
            if (flg == "calc") {
                display = disp_final_delete(display);
            }
            $(".disp").text(display + input);
            display += input;
            flg = "calc";
        }
    });

    // =
    $(".equa").click(function () {
        $(".disp").text(eval(display));
        display = "0";
        flg = "zero-ng";
        digit_flg = true;
    });
});


