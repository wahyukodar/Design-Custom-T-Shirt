 // DEFINE UNTUK PANEL
        var panel_background = "#454545";
        var panel_background_aktif = "#4554e7";
        
        // DEFINE COLPICK
        var color_colpick_default = "35a744";
        
        // DEFINE UNTUK TEXT
        var count=0;
        var jarak_top_rotate = 0;
        var jarak_left_rotate = 20;
        var height_image_rotate = 30;
        var font_size_default = 30;
        var textFontFamily = "font-family:Arial;";
        var textID,teks_sorot_var,font_color;
        
        // DEFINE UNTUK ITEM
        var sudah_pilih_item = false, sudah_pilih_category = false;
        var itemModel,itemModelDetail,itemColor,itemInfoDetail,TitleitemTerpilih;
        
        // DEFINE UNTUK IMAGE
        var TitleimageTerpilih;
      
        
        function isInteger(n) {
            return n === +n && n === (n|0);
        }

        // Fungsi untuk merotasi teks
        function rotateText(textID,RotateTo){
        var text_rotate_value = getRotationDegrees(textID);
        if(RotateTo=="toRight"){
        text_rotate_value = text_rotate_value+4;
        }
        else{
        text_rotate_value = text_rotate_value-1;
        }
        $('#'+textID+'').css({
        "-ms-transform":"rotate("+text_rotate_value+"deg)",
        "-webkit-transform":"rotate("+text_rotate_value+"deg)",
        "-moz-transform":"rotate("+text_rotate_value+"deg)",
        "-o-transform":"rotate("+text_rotate_value+"deg)",
        "transform":"rotate("+text_rotate_value+"deg)"});
            if(text_rotate_value !=0){
                $('#'+textID+'').css("border","1px dotted #4574dd");
            }
            // IMPACT rotate akan berpengaruh ke lebar div making
            if(text_rotate_value>45){
                var width_container = $("#container").width();
                if(width_container>480){ // LARGE
                    $("#making").css("padding-top","0px");
                }
                else if(width_container<=480 && width_container>300){ // MEDIUM
                    $("#making").css("padding-top","0px");
                }
                else if(width_container<=300){ // SMALL
                    $("#making").css({"width":"180px","left":"60px"});
                }
            }
        }
        
        // Fungsi untuk mendapatkan nilai rotasi
        function getRotationDegrees(obj) {
        var matrix = 
        $('#'+obj+'').css("-webkit-transform") ||
        $('#'+obj+'').css("-moz-transform")    ||
        $('#'+obj+'').css("-ms-transform")     ||
        $('#'+obj+'').css("-o-transform")      ||
        $('#'+obj+'').css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }

            if(angle < 0) angle +=360;
            return angle;
        }
        
        // Fungsi Effect Text
        function tekseffect(textID){
            var teks_all = $('#'+textID+'').text();
            var jumlah_teks_all = $('#'+textID+'').text().length;
            var height_teks_all_current = $('#'+textID+'').height();
            var teks_satuan_temp = new Array;
            var font_size_arr = new Array;
            var huruf_tengah_single = 0; // 0 is false
            var margin_font = new Array;
                
                // mencari huruf tengahnya
                var nilai_tengah_text = jumlah_teks_all/2; // misal 7/2 adalah 3
                if(isInteger(nilai_tengah_text)){
                nilai_tengah_text_ = parseInt(jumlah_teks_all/2);
                huruf_tengah_single = 0;
                }
                else{
                nilai_tengah_text_ = parseInt(jumlah_teks_all/2);
                huruf_tengah_single = 1;
                nilai_tengah_text_++; // ditambah 1
                }
                
                // memindahkan text satu demi satu ke array
                var height_teks_all_current_ = height_teks_all_current;
                var value_margin_font = 0;
                var value_margin_font_ = value_margin_font;
                for(i=0;i<jumlah_teks_all;i++){
                var teks_satuan = teks_all.slice(i,i+1);
                    teks_satuan_temp[i] = teks_satuan; // simpan text ke array
                    
                    // atur font
                    if(huruf_tengah_single==1){
                        if(i==(nilai_tengah_text_-1)){ // text tengah
                            font_size_arr[i] = height_teks_all_current;
                            margin_font[i] = value_margin_font;
                            height_teks_all_current_ = height_teks_all_current; // balik lagi ke ukuran semula, karna dia ditengah
                            value_margin_font_ = value_margin_font;
                            console.log("tengah");
                        }
                        else if(i<(nilai_tengah_text_-1)){ // text kiri
                            var dif_val = nilai_tengah_text_ - (i+1);
                            font_size_arr[i] = height_teks_all_current_ - (dif_val*20);
                            margin_font[i] = value_margin_font_ + (dif_val*10);
                            height_teks_all_current_ = height_teks_all_current; // update terus, ukuran dikurangi terus
                            value_margin_font_ = value_margin_font;
                            console.log("kiri="+(i+1)+" value="+height_teks_all_current_+" dif="+dif_val);
                        }
                        else if(i>(nilai_tengah_text_-1)){ // text kanan
                            font_size_arr[i] = height_teks_all_current_ - 20;
                            margin_font[i] = value_margin_font_ + 10;
                            height_teks_all_current_ = height_teks_all_current_ - 20; // update terus, ukuran dikurangi terus
                            value_margin_font_ = value_margin_font_ + 10;
                            console.log("kanan"+(i+1));
                        }
                    }
                    else if(huruf_tengah_single==0){
                        if(i==(nilai_tengah_text_) || i==(nilai_tengah_text_-1)){ // text tengah
                            font_size_arr[i] = height_teks_all_current;
                            margin_font[i] = value_margin_font;
                            height_teks_all_current_ = height_teks_all_current; // balik lagi ke ukuran semula, karna dia ditengah
                            value_margin_font_ = value_margin_font;
                            console.log("tengah");
                        }
                        else if(i<(nilai_tengah_text_-1)){ // text kiri
                            var dif_val = nilai_tengah_text_ - (i+1);
                            font_size_arr[i] = height_teks_all_current_ - (dif_val*20);
                            margin_font[i] = value_margin_font_ + (dif_val*10);
                            height_teks_all_current_ = height_teks_all_current; // update terus, ukuran dikurangi terus
                            value_margin_font_ = value_margin_font;
                            console.log("kiri="+(i+1)+" value="+height_teks_all_current_+" dif="+dif_val);
                        }
                        else if(i>(nilai_tengah_text_-1)){ // text kanan
                            font_size_arr[i] = height_teks_all_current_ - 20;
                            margin_font[i] = value_margin_font_ + 10;
                            height_teks_all_current_ = height_teks_all_current_ - 20; // update terus, ukuran dikurangi terus
                            value_margin_font_ = value_margin_font_ + 10;
                            console.log("kanan"+(i+1));
                        }
                    }
                    
                    if(i==(jumlah_teks_all-1)){
                     $('#'+textID+'').remove(); // delete element
                    }
                }
           
            
           /* $("<div id='rotate"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>").appendTo('#text_wrap'+textID+'');*/
            
            // element baru dengan id text yg sama
            /*$("<div id='rotate"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
            +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
            +"<div id='"+textID+"' style='line-height:1.00;'></div></div>").appendTo('#text_wrap'+textID+'')*/
                $("<div style='text-align:center;'><div id='"+textID+"' style='display:inline-block;margin:auto;'></div></div>").appendTo('#text_wrap'+textID+'');
                for(i=0;i<teks_satuan_temp.length;i++){
                    var teks_satuan = teks_satuan_temp[i];
                    console.log("Ukuran Font:"+font_size_arr[i]+" /n");
                    $("<span class='"+textID+"' style='color:#a54565;font-size:"+parseInt(font_size_arr[i])+"px;margin-top:"+margin_font[i]+"px;float:left;'>"+teks_satuan+"</span>").appendTo('#'+textID+''); // buat baru, dengan ukuran yang sudah disesuaikan
                }
            //$("<div id='clearer'></div>").appendTo('#'+textID+'') 
            //TextPropertiesEffect(textID);
            resizeTextAfterTextEffect(textID);
            //console.log(teks_all+jumlah_teks_all+"   ===  "+height_teks_all_current);
            
        }
        
        
                
        // FUNCTION CREATE
        function createText(){
            if($("#createTextId").text()=="Create Text"){ // Create Text
                textID = "text_id_"+count;
                font_color = "#"+$(".colpick_hex_field > input").val();
                // making object text
                $("#making").append(
                "<div id='text_wrap"+textID+"' style='cursor:move;position:absolute;z-index:999;'><div id='aturfontfamily' style='text-align:center;"+textFontFamily+"'>"
                +"<div id='rotate"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                +"<div id='rotate2"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/rotate2.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                +"<div id='remove"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/clear.png' height='13px' alt='text remove'></div>"
                +"<span id='"+textID+"' style='color:"+font_color+";line-height:1.00;font-size:"+font_size_default+"px;display:block;'>"
                +$("#teks").val()+"</span></div></div>");
                TextPropertiesEffect(textID); // add draggable, event mouse, rotate
                
                var width_container = $("#container").width();
                if(width_container>480){
                  resizeTextBeforeTextEffect(textID); // add resizable 
                }
                            
                ClosePanel();
                count++;
               
            }
            else{ // Update Text
                if($("#teks").val()==teks_sorot_var_text){ // jika textnya tidak diganti
                    font_color = "#"+$(".colpick_hex_field > input").val();
                    $('#'+teks_sorot_var+'').css("color",font_color);
                    $('#text_wrap'+teks_sorot_var+' > #aturfontfamily').attr('style', textFontFamily);
                    ClosePanel();
                }
                else{ // jika textnya diganti
                    textID = "text_id_"+count;
                    $('#text_wrap'+teks_sorot_var+'').remove(); // BEDANYA, HAPUS DULU YG LAMA, BARU RECREATE
                    font_color = "#"+$(".colpick_hex_field > input").val();
                    // making object text
                    $("#making").append(
                    "<div id='text_wrap"+textID+"' style='cursor:move;position:absolute;z-index:999;'><div id='aturfontfamily' style='text-align:center;"+textFontFamily+"'>"
                    +"<div id='rotate"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                    +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                    +"<div id='remove"+textID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                    +"<img src='images/clear.png' height='13px' alt='text remove'></div>"
                    +"<span id='"+textID+"' style='color:"+font_color+";line-height:1.00;font-size:"+font_size_default+"px;display:block;'>"
                    +$("#teks").val()+"</span></div></div>");
                    TextPropertiesEffect(textID); // add draggable, event mouse, rotate
                    var width_container = $("#container").width();
                    if(width_container>480){
                      resizeTextBeforeTextEffect(textID); // add resizable 
                    }
                    ClosePanel();
                }
            }
        }
        
    

    function attachPinch(textID){
        $('#'+textID+'').hammer().on("pinchin pinchout", function(event) {
            switch(event.type) {
                case 'pinchin':
                var hh = $('#text_wrap'+textID+'').height();
                var widthTextWrapNow = $('#text_wrap'+textID+'').width();
                if(widthTextWrapNow>40){ // minimal width 40
                //var hhh = hh - event.gesture.scale;
                var hhh = hh - 1;
                            $('#text_wrap'+textID+'').css("height",hhh+"px"); 
                            $('#'+textID+'').css("font-size",(hhh-5)+"px"); // dikurang 5px biar gak offset
                            $('#rotate'+textID+'').css("height",(hhh)+"px");
                            $('.img_text').css("margin-top",((hhh/2)-(height_image_rotate/2))+"px");
                }
                break;
                case 'pinchout':
                var hh = $('#text_wrap'+textID+'').height();
                var width_making = $('#making').width();
                var widthTextWrapNow = $('#text_wrap'+textID+'').width();
                if(widthTextWrapNow<width_making){
                //var hhh = hh + event.gesture.scale;
                var hhh = hh + 1;
                            $('#text_wrap'+textID+'').css("height",hhh+"px"); 
                            $('#'+textID+'').css("font-size",(hhh-5)+"px"); // dikurang 5px biar gak offset
                            $('#rotate'+textID+'').css("height",(hhh)+"px");
                            $('.img_text').css("margin-top",((hhh/2)-(height_image_rotate/2))+"px");
                }
                break;
            }
        });
    }
    
    
    
    function attachPinchImage(ImageDropID){
        $('#'+ImageDropID+'').hammer().on("pinchin pinchout", function(eventimage) {
            switch(eventimage.type) {
                case 'pinchin':
                var hh = $('#image_wrap'+ImageDropID+'').height();
                var widthTextWrapNow = $('#'+ImageDropID+'').width();
                if(widthTextWrapNow>40){ // minimal width 40
                var hhh = hh - eventimage.gesture.scale;
                            $('#image_wrap'+ImageDropID+'').css("height",hhh+"px"); 
                            $('#'+ImageDropID+'').css("height",(hhh-5)+"px"); // dikurang 5px biar gak offset
                            $('#rotate'+ImageDropID+'').css("height",(hhh)+"px");
                            $('.img_text').css("margin-top",((hhh/2)-(height_image_rotate/2))+"px");
                }
                break;
                case 'pinchout':
                var hh = $('#image_wrap'+ImageDropID+'').height();
                var width_making = $('#making').width();
                var widthTextWrapNow = $('#'+ImageDropID+'').width();
                if(widthTextWrapNow<width_making){
                var hhh = hh + eventimage.gesture.scale;
                            $('#image_wrap'+ImageDropID+'').css("height",hhh+"px"); 
                             $('#'+ImageDropID+'').css("height",(hhh-5)+"px"); // dikurang 5px biar gak offset
                            $('#rotate'+ImageDropID+'').css("height",(hhh)+"px");
                            $('.img_text').css("margin-top",((hhh/2)-(height_image_rotate/2))+"px");
                }
                break;
            }
        });
    }


         
        
	
        function TextPropertiesEffect(textID){
        // making config object above
            setTimeout(function (){
            
            // EVENT DRAG
                $('#text_wrap'+textID+'').draggable({
                  containment: "#making"
                });
            
            // EVENT MOUSE
                var TimerUntukRotate=false;
                $('#text_wrap'+textID+'')
                .mouseenter(function() {
                clearTimeout(TimerUntukRotate);
                $("#making").css("border","1px solid #4574dd");
                var isRotate = getRotationDegrees(textID);
                if(isRotate !=0){
                $('#'+textID+'').css("border","1px dotted #4574dd");
                }
                $('#text_wrap'+textID+'').css("border","1px solid #4574dd");
                $('#rotate'+textID+'').css({"display":"block","left":(-jarak_left_rotate*2.5)+"px","padding-right":jarak_left_rotate+"px"});
                $('#rotate2'+textID+'').css({"display":"block","right":(-jarak_left_rotate*2.5)+"px","padding-left":jarak_left_rotate+"px"});
                    var width_container = $("#container").width();
                    if(width_container<=300){
                    $('#remove'+textID+'').css({"display":"block","right":0+"px","top":-24+"px","padding":2+"px"});
                    }
                    else{
                    $('#remove'+textID+'').css({"display":"block","right":0+"px","top":-40+"px","padding":2+"px"});
                    }
                }).mouseleave(function() {
                    TimerUntukRotate = setTimeout(function(){
                        $('#rotate'+textID+'').css("display","none");
                        $('#rotate2'+textID+'').css("display","none");
                        $('#remove'+textID+'').css("display","none");
                        $("#making").css("border","none");
                        $('#'+textID+'').css("border","none");
                        $('#text_wrap'+textID+'').css("border","none");
                    }, 1000);
                });
                
                
                
            	
                // EVENT DOUBLE CLICK OR DOUBLE TAP(ANDROID)
               
               
               
               var width_container = $("#container").width();
               if(width_container<=480){
                   
                    attachPinch(textID);
           
               }
               
               
                // EVENT DOUBLE TAP
                
                
                var doubleTapTextID = document.getElementById(textID);
                Hammer(doubleTapTextID).on("doubletap", function() {
                    if(VaropenPanel){
                        if(VaropenPanelItem){
                            teks_sorot_var = textID;
                            teks_sorot_var_text = $('#'+textID+'').text();
                            $("#teks").val(teks_sorot_var_text);
                            $("#createTextId").text("Update Text");
                            openPanelText();
                        }
                        else if(VaropenPanelText){
                            if($("#createTextId").text()=="Create Text"){
                                teks_sorot_var = textID;
                                teks_sorot_var_text = $('#'+textID+'').text();
                                $("#teks").val(teks_sorot_var_text);
                                $("#createTextId").text("Update Text");
                                openPanelText();
                            }
                            else{
                                if(teks_sorot_var==textID){
                                    ClosePanel();
                                    VaropenPanel = false;
                                }
                                else{
                                    teks_sorot_var = textID;
                                    teks_sorot_var_text = $('#'+textID+'').text();
                                    $("#teks").val(teks_sorot_var_text);
                                    $("#createTextId").text("Update Text");
                                    openPanelText();
                                }
                            }
                        }
                        else if(VaropenPanelImage){
                            teks_sorot_var = textID;
                            teks_sorot_var_text = $('#'+textID+'').text();
                            $("#teks").val(teks_sorot_var_text);
                            $("#createTextId").text("Update Text");
                            openPanelText();
                        }
                    }
                    else{
                        teks_sorot_var = textID;
                        teks_sorot_var_text = $('#'+textID+'').text();
                        $("#teks").val(teks_sorot_var_text);
                        $("#createTextId").text("Update Text");
                        openPanelText();
                    }
                });
                
                // EVENT CLICK
                $('#rotate'+textID+'').click(function(){
                   //rotateText(textID);
                   //$('#'+textID+'').arctext({radius: 300})
                   //$('#'+textID+'').jqIsoText();
                   //tekseffect(textID);
                });
                
                $('#remove'+textID+'').click(function(){
                    $('#text_wrap'+textID+'').remove();
                });
            
            // EVENT LONG CLICK
                var timeout, clicker = $('#rotate'+textID);
                clicker.mousedown(function(){
                timeout = setInterval(function(){
                rotateText(textID,"toRight");
                }, 150);

                return false;
                });
                
                var timeout2, clicker2 = $('#rotate2'+textID);
                clicker2.mousedown(function(){
                timeout2 = setInterval(function(){
                rotateText(textID,"toLeft");
                }, 150);

                return false;
                });

                $(document).mouseup(function(){
                clearInterval(timeout);clearInterval(timeout2);
                return false;
                });
            }, 50); // how long do you want the delay to be? 
        } // TEXTEFFETPROPERTIES =====================================================================
        
        
        
        // Fungsi untuk merotasi image
        function rotateImage(ImageDropID,RotateTo){
            var image_rotate_value = getRotationDegrees("inner_image_wrap"+ImageDropID);
            if(RotateTo=="toRight"){
            image_rotate_value = image_rotate_value+4;
            }
            else{
            image_rotate_value = image_rotate_value-1;
            }
            $("#inner_image_wrap"+ImageDropID).css({
            "-ms-transform":"rotate("+image_rotate_value+"deg)",
            "-webkit-transform":"rotate("+image_rotate_value+"deg)",
            "-moz-transform":"rotate("+image_rotate_value+"deg)",
            "-o-transform":"rotate("+image_rotate_value+"deg)",
            "transform":"rotate("+image_rotate_value+"deg)"});
        }
          function ImagePropertiesEffect(ImageDropID){
        // making config object above
            setTimeout(function (){
           
            // EVENT MOUSE
                var TimerUntukRotate=false;
                $('#image_wrap'+ImageDropID+'')
                .mouseenter(function() {
                clearTimeout(TimerUntukRotate);
                $("#making").css("border","1px solid #4574dd");
                $('#image_wrap'+ImageDropID+'').css("border","1px solid #4574dd");
                $('#rotate'+ImageDropID+'').css({"display":"block","left":(-jarak_left_rotate*2.5)+"px","padding-right":jarak_left_rotate+"px"});
                $('#rotate2'+ImageDropID+'').css({"display":"block","right":(-jarak_left_rotate*2.5)+"px","padding-left":jarak_left_rotate+"px"});
                    var width_container = $("#container").width();
                    if(width_container<=300){
                    $('#remove'+ImageDropID).css({"display":"block","right":0+"px","top":-24+"px","padding":2+"px"});
                    }
                    else{
                    $('#remove'+ImageDropID).css({"display":"block","right":0+"px","top":-40+"px","padding":2+"px"});
                    }
                }).mouseleave(function() {
                    TimerUntukRotate = setTimeout(function(){
                        $('#rotate'+ImageDropID).css("display","none");
                        $('#rotate2'+ImageDropID).css("display","none");
                        $('#remove'+ImageDropID).css("display","none");
                        $("#making").css("border","none");
                        $('#'+ImageDropID).css("border","none");
                        $('#image_wrap'+ImageDropID).css("border","none");
                    }, 1000);
                });
                
               
               var width_container = $("#container").width();
               if(width_container<=480){
                    attachPinchImage(ImageDropID);
               }
               else if(width_container>480){
                    resizeImageEffect(ImageDropID);
               }
               
                $('#remove'+ImageDropID+'').click(function(){
                    $('#image_wrap'+ImageDropID+'').remove();
                });
            
            // EVENT LONG CLICK
                var timeout, clicker = $('#rotate'+ImageDropID);
                clicker.mousedown(function(){
                timeout = setInterval(function(){
                rotateImage(ImageDropID,"toRight");
                }, 150);

                return false;
                });
                
                var timeout2, clicker2 = $('#rotate2'+ImageDropID);
                clicker2.mousedown(function(){
                timeout2 = setInterval(function(){
                rotateImage(ImageDropID,"toLeft");
                }, 150);

                return false;
                });

                $(document).mouseup(function(){
                clearInterval(timeout);clearInterval(timeout2);
                return false;
                });
            }, 50); // how long do you want the delay to be? 
        }
        
         function resizeImageEffect(ImageDropID){
            // EVENT RESIZE
                var w_ = $('#'+ImageDropID).width();
                var h_ = $('#'+ImageDropID).height();
                //console.log("width="+w_+" || height="+h_);

                $('#'+ImageDropID).resizable({
                  aspectRatio: w_ / h_,
                  minHeight: 20,
                  minWidth: 20,
                  maxHeight: 350,
                  maxWidth: 350,
                  containment: "#making",
                  autoHide: true,
                  handles: 'nw,ne,n,e,w,s,sw,se',
                  resize  : function(event,ui) {
                    var h = $('#image_wrap'+ImageDropID+'').height();
                    $('#rotate'+ImageDropID).css("height",(h)+"px");
                    $('.img_text').css("margin-top",((h/2)-(height_image_rotate/2))+"px");
                    }
                    /*stop : function(event,ui) {
                   
                    }*/
                });
        }
        
        function resizeTextBeforeTextEffect(textID){
            // EVENT RESIZE
                var w_ = $('#'+textID+'').width();
                var h_ = $('#'+textID+'').height();
                //console.log("width="+w_+" || height="+h_);

                $('#text_wrap'+textID+'').resizable({
                  aspectRatio: w_ / h_,
                  minHeight: 20,
                  minWidth: 20,
                  maxHeight: 350,
                  maxWidth: 350,
                  containment: "#making",
                  autoHide: true,
                  handles: 'nw,ne,n,e,w,s,sw,se',
                  resize  : function(event,ui) {
                    var h = $('#text_wrap'+textID+'').height();
                    $('#'+textID+'').css("font-size",(h-5)+"px"); // dikurang 5px biar gak offset
                    $('#rotate'+textID+'').css("height",(h)+"px");
                    $('.img_text').css("margin-top",((h/2)-(height_image_rotate/2))+"px");
                    }
                    /*stop : function(event,ui) {
                   
                    }*/
                });
        }
        
        function resizeTextAfterTextEffect(textID){
            // EVENT RESIZE
                var w_ = $('#'+textID+'').width();
                var h_ = $('#'+textID+'').height();
                //console.log("width="+w_+" || height="+h_);
                var current_height=$('#text_wrap'+textID+'').height();
                var fix_add_height = 0;
                var cur_font_size =0;
                var cur_font_size_ =0;
                var ambil_cur_font_size =0;
                $('#text_wrap'+textID+'').resizable({
                  aspectRatio: w_ / h_,
                  minHeight: 20,
                  minWidth: 20,
                  maxHeight: 350,
                  maxWidth: 350,
                  containment: "#making",
                  autoHide: true,
                  resize  : function(event,ui) {
                    
                    },
                    stop : function(event,ui) {
                            console.log("STOP:"+cur_font_size_);
                            ambil_cur_font_size=1;
                    }
                });
        }
        
        
        function chooseItem(folderItem,jenisItemDetail,itemPilihan){
            $("#item_product").empty();
            $("#"+itemModel+"-"+itemModelDetail+"").css("display","none"); // reset properties yang sebelumnya
            itemModel = folderItem;
            itemModelDetail = jenisItemDetail;
            $("#"+itemModel+"-"+itemModelDetail+"").css("display","block"); // tampilkan properties yang baru
            var width_container = $("#container").width();
            if(width_container>480){
                $("#item_product").append("<img src='item/"+folderItem+"/"+jenisItemDetail+"/"+itemPilihan+".jpg' width='510' height='490' id='view_front'>");
                //$("#panel-container-item").css({"padding-top":"60px","height":"280px"});
            }
            else if(width_container<=480 && width_container>300){
                $("#item_product").append("<img src='item/"+folderItem+"/"+jenisItemDetail+"/"+itemPilihan+".jpg' width='480' height='450' id='view_front'>");
                //$("#panel-container-item").css({"padding-top":"50px","height":"230px"});
            }
            else if(width_container<=300){
                $("#item_product").append("<img src='item/"+folderItem+"/"+jenisItemDetail+"/"+itemPilihan+".jpg' width='300' height='285' id='view_front'>");
                //$("#panel-container-item").css({"padding-top":"50px","height":"230px"});
            }
            //ClosePanel();
            sudah_pilih_item = true;
            var panel_container_item_properties = $("#panel-container-item-properties").css("display");
                if(panel_container_item_properties!="block"){
                $("#change_Color_Item").css("display","block");
                }
            
        }
        
        var VaropenPanel = false, VaropenPanelItem = false, VaropenPanelText = false, VaropenPanelImage = false;
        function openPanelItem(){
            if($("#createTextId").text()=="Update Text"){
                $("#teks").val("");
                $("#createTextId").text("Create Text");
            }
            $("#panel").animate({"left":"0px"});
            $("#panel-container-item").css("display","block");
            $("#panel-close").css("display","block");
            $("#panel-item").css({"background":panel_background_aktif,"color":"#fff"});
            
            
            
            $("#panel-text").css("background",panel_background);
            $("#panel-image").css("background",panel_background);
            VaropenPanel = true;VaropenPanelItem=true;
            keKananMasingPanel();
            if(VaropenPanelText==true){$("#panel-container-text").css("display","none");VaropenPanelText=false;}
            if(VaropenPanelImage==true){$("#panel-container-image").css("display","none");VaropenPanelImage=false;}
            if(sudah_pilih_item){ // PROPERTIES
                $("#panel-container-item-pilih").css("display","none");
                $("#panel-container-item-properties").css("display","block");
                $("#"+itemModel+"-"+itemModelDetail+"").css("display","block");
                $("#change_Color_Item").css("display","none");
                $("#change_Category_Item").css("display","none");
                $("#panel-container-item-category").css("display","none");
            }
            else if(sudah_pilih_category){
                $("#Items_"+TitleitemTerpilih).css("display","block");
                $("#panel-container-item-pilih").css("display","block");
                $("#change_Category_Item").css("display","block");
                $("#panel-container-item-category").css("display","none");
            }
            else{
                $("#panel-container-item-pilih").css("display","none");
                $("#panel-container-item-properties").css("display","none");
            }
        }
        
        function changeColorItem(){
            $("#change_Color_Item").css("display","none");
            $("#change_Category_Item").css("display","none");
            $("#panel-container-item-pilih").css("display","none");
            $("#panel-container-item-properties").css("display","block");
            if(sudah_pilih_item){ // PROPERTIES
                $("#panel-container-item-pilih").css("display","none");
                $("#panel-container-item-properties").css("display","block");
                $("#"+itemModel+"-"+itemModelDetail+"").css("display","block");
            }
            else{
                $("#panel-container-item-pilih").css("display","block");
                $("#panel-container-item-properties").css("display","none");
            }
        }
        
        function changeItem(){
            $("#panel-container-item-pilih").css("display","block");
            $("#panel-container-item-properties").css("display","none");
            $("#change_Color_Item").css("display","block");
            $("#change_Category_Item").css("display","block");
            $("#Items_"+TitleitemTerpilih).css("display","block");
        }
        
        function changeCategoryItem(){
            $("#Items_"+TitleitemTerpilih).css("display","none");
            $("#panel-container-item-pilih").css("display","none");
            $("#change_Category_Item").css("display","none");
            $("#panel-container-item-category").css("display","block");
            $("#change_Color_Item").css("display","none");
        }
        
        function clearItem(){
            $("#panel-container-item-category").css("display","block");
            $("#panel-container-item-pilih").css("display","none");
            $("#panel-container-item-properties").css("display","none");
            $("#change_Color_Item").css("display","none");
            $("#item_product").empty();
            sudah_pilih_item=false;
            sudah_pilih_category=false;
            var width_container = $("#container").width();
            if(width_container>480){
                $("#panel-container-item").css({"padding-top":"0px","height":"330px"});
            }
            else if(width_container<=480 && width_container>300){
                $("#panel-container-item").css({"padding-top":"0px","height":"280px"});
            }
            else if(width_container<=300){
                $("#panel-container-item").css({"padding-top":"0px","height":"280px"});
            }
        }
        
        function openPanelText(){
            $("#panel").animate({"left":"0px"});
            $("#panel-container-text").css("display","block");
            $("#panel-close").css("display","block");
            $("#panel-text").css({"background":panel_background_aktif,"color":"#fff"});
                
            $("#panel-item").css("background",panel_background);
            $("#panel-image").css("background",panel_background);
            VaropenPanel = true;VaropenPanelText=true;
            keKananMasingPanel();
            if(VaropenPanelItem==true){$("#panel-container-item").css("display","none");VaropenPanelItem=false;}
            if(VaropenPanelImage==true){$("#panel-container-image").css("display","none");VaropenPanelImage=false;}
            var width_container = $("#container").width();
            if(width_container>480){
                $("#colorpicker").css({"width":"210px","margin":"auto","text-align":"center"});
                $('#colorpicker').colpickweb({
                    flat:true,
                    layout:'hex',
                    submit:0,
                    color:color_colpick_default
                });
            }
            else{
                $("#colorpicker").css({"width":"30px","height":"30px","background":"#"+color_colpick_default+"","margin":"auto"});
                $('#colorpicker').colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:color_colpick_default,
                    onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color','#'+hex);
                    $(el).colpickHide();
                    }
                });
            }
            
            
        }
        
        function openPanelImage(){
            if($("#createTextId").text()=="Update Text"){
                $("#teks").val("");
                $("#createTextId").text("Create Text");
            }
            $("#panel").animate({"left":"0px"});
            $("#panel-container-image").css("display","block");
            $("#panel-close").css("display","block");
            $("#panel-image").css({"background":panel_background_aktif,"color":"#fff"});
            
            $("#panel-item").css("background",panel_background);
            $("#panel-text").css("background",panel_background);
            VaropenPanel = true;VaropenPanelImage=true;
            keKananMasingPanel();
            if(VaropenPanelText==true){$("#panel-container-text").css("display","none");VaropenPanelText=false;}
            if(VaropenPanelItem==true){$("#panel-container-item").css("display","none");VaropenPanelItem=false;}
        }
        
        function changeImage(){
            $("#titleimagecontainer").css("display","block");
            $("#image_"+TitleimageTerpilih).css("display","none");
            $("#backChooseImage").css("display","none");
            var width_container = $("#container").width();
            if(width_container>480){
                $("#panel-container-image").css({"padding-top":"0px","height":"330px"});
            }
            else if(width_container<=480 && width_container>300){
                $("#panel-container-image").css({"padding-top":"0px","height":"280px"});
            }
            else if(width_container<=300){
                $("#panel-container-image").css({"padding-top":"0px","height":"280px"});
            }
        }
        
        function ClosePanel(){
            VaropenPanel = false;
            var width_panel = $('#panel').width();
                if(width_panel>200){
                    $("#panel").animate({"left":"-320px"});
                }
                else if(width_panel<=200){
                    $("#panel").animate({"left":"-220px"});
                }
            $("#teks").val("");
            $("#createTextId").text("Create Text");
            $(".panel-config").css("right","-15px");
            $("#panel-close").css("display","none");
            $("#panel-image").css("background",panel_background);
            $("#panel-item").css("background",panel_background);
            $("#panel-text").css("background",panel_background);
        }
        
        function keKananMasingPanel(){
            $(".panel-config").css("right","-60px");
        }
        
        function closePreviewItem(){
            $("#ScreenPreviewItem").css("display","none");
            $("#ScreenPreviewOverlay").css("display","none");
        }

        
                
        function saveDesain(){
            html2canvas($('#container'), {
                onrendered: function(canvas) {
                    var img = canvas.toDataURL()
                    canvas.toBlob(function(blob) {
                    saveAs(blob, "desainbajuku.png");
                    }, "image/png");
                }
            });
        }    

        var ImageUploadCount=0;
        function UploadImage(input){
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                $(reader).load(function(theFile) {
                    //get the data uri
                            ImageDropID = "uploadimage_"+ImageUploadCount;
                            var dataURI = theFile.target.result;
                            $("<div style='cursor:move;position:absolute;z-index:999;' id='image_wrap"+ImageDropID+"'>"
                            +"<div id='rotate"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                            +"<div id='rotate2"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/rotate2.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                            +"<div id='remove"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/clear.png' height='13px' alt='text remove'></div>"
                            +"<div id='inner_image_wrap"+ImageDropID+"'>"
                            +"<img src="+dataURI+" id="+ImageDropID+" style='max-width:270px;max-height:410px;position:relative;z-index:9999;'/></div></div>").appendTo("#making").draggable({containment: "#making"});
                            ImagePropertiesEffect(ImageDropID); 
                            ImageUploadCount++;
                });
                reader.readAsDataURL(input.files[0]);
                ClosePanel();
            }
        }  
        
       
        
        // DOCUMENT READY
        $( document ).ready(function() {   
            var ImageDropCount=0;
            
            $(document).mouseenter(function() {
                $("#making").css("border","none");
            });
            
            var width_container = $("#container").width();
            if(width_container<=480){
                $("#imagePrint").css("display","none");
                $("#panel-container-item-properties > div > li").css("padding","15px");
            }
            else{
            }
                
            $("#wrap-image-ScreenPreviewItem,#wrap-text-ScreenPreviewItem,#ScreenPreviewOverlay").click(function(){
                ClosePanel();
            });
            
            $("#image_Upload").on('click',function(){
                $("#imageUpload").click();
            });
            
            $("#imageUpload").on('change',function(e){
                UploadImage(this);
                $("#imageUpload").val("");
            });
            
            $("#panel-container-item-pilih > div > li").mouseenter(function() {
                var itemModel = $(this).attr("item_model");
                var itemModelDetail = $(this).attr("item_model_detail");
                var itemColor = $(this).attr("item_color");
                var itemInfoDetail = $(this).attr("item_info_detail");
                if(itemInfoDetail==""){itemInfoDetail="No Information Detail";}
                $("#wrap-image-ScreenPreviewItem").html("<img src='item/"+itemModel+"/"+itemModelDetail+"/"+itemColor+".jpg' width='180px' class='radius'/>");
                $("#wrap-text-ScreenPreviewItem").html(itemInfoDetail);
                $("#ScreenPreviewOverlay").css("display","block");
                $("#ScreenPreviewItem").css("display","block");
            });
            
            var width_container = $("#container").width();
            if(width_container>480){
                $("#panel-container-item-pilih > div > li").mouseleave(function() {
                    closePreviewItem();
                });
            }
            else{
                $("#panel-container-item-pilih > div > li").mouseenter(function() {
                    $("#wrap-close-ScreenPreviewItem").css("display","block");
                });
                var doublewrapimageScreenPreviewItem = document.getElementById('wrap-image-ScreenPreviewItem');
                    Hammer(doublewrapimageScreenPreviewItem).on("doubletap", function() {
                        closePreviewItem();
                    });
                var doublewraptextScreenPreviewItem = document.getElementById('wrap-text-ScreenPreviewItem');
                    Hammer(doublewraptextScreenPreviewItem).on("doubletap", function() {
                        closePreviewItem();
                    });
            }
            
            $("#fontstyleterpilih,#fontstylepilihan").click(function(){
                $("#fontstylepilihan").toggle();
            });
            $("#fontstylepilihan > span").click(function(){
                $("#fontstyleterpilih").html("<span style='"+$(this).attr("style")+"' nama_font='"+
                $(this).attr("nama_font")+"'>"+$(this).attr("nama_font")+"</span>");
                textFontFamily = $(this).attr("style");
                $("#teks").focus();
            });
            
            $("#titleimagecontainer > span").click(function(){
                TitleimageTerpilih = $(this).attr("title_Image");
                $("#image_"+TitleimageTerpilih).css("display","block");
                $("#titleimagecontainer").css("display","none");
                $("#backChooseImage").css("display","block");
                var width_container = $("#container").width();
                if(width_container>480){
                    $("#panel-container-image").css({"padding-top":"60px","height":"280px"});
                    $(".image-wraps > img").css("max-width","270px");
                }
                else if(width_container<=480 && width_container>300){
                    $("#panel-container-image").css({"padding-top":"50px","height":"230px"});
                    $(".image-wraps > img").css("max-width","180px");
                }
                else if(width_container<=300){
                    $("#panel-container-image").css({"padding-top":"50px","height":"230px"});
                    $(".image-wraps > img").css("max-width","180px");
                }
            });
            
            
            $("#panel-container-item-category > span").click(function(){
                TitleitemTerpilih = $(this).attr("title_Category");
                $("#Items_"+TitleitemTerpilih).css("display","block");
                $("#panel-container-item-pilih").css("display","block");
                
                $("#change_Category_Item").css("display","block");
                $("#panel-container-item-category").css("display","none");
                var width_container = $("#container").width();
                if(width_container>480){
                    $("#Items_"+TitleitemTerpilih).css("width","260px");
                }
                else {
                    $("#Items_"+TitleitemTerpilih).css("width","200px");
                }
                
                if(sudah_pilih_item){ 
                    $("#change_Color_Item").css("display","block");
                }
                
                sudah_pilih_category = true;
            });
            
             $(".image-wraps > img").click(function(){
                var hrefImageClick = $(this).attr("src");
                
                var MaxwidthImage = 0;
                var width_container = $("#container").width();
                if(width_container>480){
                    MaxwidthImage=270;
                }
                else if(width_container<=480 && width_container>300){
                    MaxwidthImage=160;
                }
                else if(width_container<=300){
                    MaxwidthImage=160;
                }
                
                ImageDropID = "clickimage_"+ImageDropCount;
                $("<div style='cursor:move;position:absolute;z-index:999;' id='image_wrap"+ImageDropID+"'>"
                +"<div id='rotate"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                +"<div id='rotate2"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/rotate2.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                +"<div id='remove"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                +"<img src='images/clear.png' height='13px' alt='text remove'></div>"
                +"<div id='inner_image_wrap"+ImageDropID+"'>"
                +"<img src="+hrefImageClick+" id="+ImageDropID+" style='max-width:"+MaxwidthImage+"px;position:relative;z-index:9999;'/></div></div>").appendTo("#making").draggable({containment: "#making"});
                ImagePropertiesEffect(ImageDropID); 
                ImageDropCount++;
                ClosePanel();
            });
            
            
                var handleDrag = function(e) {
                    //kill any default behavior
                    e.stopPropagation();
                    e.preventDefault();
                };
                var handleDrop = function(e) {
                    //kill any default behavior
                    e.stopPropagation();
                    e.preventDefault();
                    //console.log(e);
                    //get x and y coordinates of the dropped item
                    x = e.clientX;
                    y = e.clientY;
                    //drops are treated as multiple files. Only dealing with single files right now, so assume its the first object you're interested in
                    var file = e.dataTransfer.files[0];
                    
                    //don't try to mess with non-image files
                    if (file.type.match('image.*')) {
                        //then we have an image,

                        //we have a file handle, need to read it with file reader!
                        var reader = new FileReader();

                        // Closure to capture the file information.
                        reader.onload = (function(theFile) {
                        
                            //get the data uri
                            ImageDropID = "dropimage_"+ImageDropCount;
                            var dataURI = theFile.target.result;
                            $("<div style='cursor:move;position:absolute;z-index:999;' id='image_wrap"+ImageDropID+"'>"
                            +"<div id='rotate"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/rotate.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                            +"<div id='rotate2"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/rotate2.png' height='"+height_image_rotate+"px' class='img_text' alt='text rotate'></div>"
                            +"<div id='remove"+ImageDropID+"' style='position:absolute;z-index:99;display:none;cursor:pointer;color:#fff;'>"
                            +"<img src='images/clear.png' height='13px' alt='text remove'></div>"
                            +"<div id='inner_image_wrap"+ImageDropID+"'>"
                            +"<img src="+dataURI+" id="+ImageDropID+" style='max-width:270px;max-height:410px;position:relative;z-index:9999;'/></div></div>").appendTo("#making").draggable({containment: "#making"});
                            ImagePropertiesEffect(ImageDropID); 
                            ImageDropCount++;
                        });
                        //this reads in the file, and the onload event triggers, which adds the image to the div at the carat
                        reader.readAsDataURL(file);
                    }
                };

                var dropZone = document.getElementById('making');
                dropZone.addEventListener('dragover', handleDrag, false);
                dropZone.addEventListener('drop', handleDrop, false);
             
}); // end document ready