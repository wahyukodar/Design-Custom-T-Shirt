<?php
include "config/setting.php";
?>
<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />
		<title><?php echo $base_name_site; ?></title>
        <link rel="stylesheet" href="css/jquery-ui.css">
        <link rel="stylesheet" href="css/fontfamilystyle.css" type="text/css" charset="utf-8" />
        <link rel="stylesheet" href="css/colpick.css" type="text/css" charset="utf-8" />
        <link rel="stylesheet" href="css/mystyle.css" type="text/css" charset="utf-8" />

        <script src="js/jquery-1.10.2.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/jquery.ui.touch-punch.js"></script>  <!-- drag and resize di device android -->
        <script src="js/hammer.js"></script>  <!-- double click di device android -->
        <script src="js/jquery.hammer.min.js"></script>    <!-- double click di device android -->
        <script src="js/html2canvas.js"></script>
        <script src="js/Blob.js"></script> 
        <script src="js/canvas-toBlob.js"></script> 
        <script src="js/FileSaver.js"></script> 
        <script src="js/colpick.js"></script> 
        <script src="js/jquery.arctext.js"></script>
        <script src="js/jqIsoText.js"></script>
        <script src="js/MyJavascript.js"></script>
        
	</head>
	<body>
    
    <div id="header">
    <div id="header2">
    <div id="left-header">
    Design Gallery
    </div><!-- /left-header -->
    <div id="right-header">
    Custom
    </div><!-- /right-header -->
    <div id="clearer"></div>
    </div><!-- /header2 -->
    </div><!-- /header -->
    
    <div id="panel" class="radius20">
    
        <div id="panel-container-item">
            <div id="changecategoryColor" style="margin:auto;display:block;">
                <div id="change_Category_Item" style="display:none;float:left;" class="buttonclickD radius" onclick="changeCategoryItem()">Category</div>
                <div id="change_Color_Item" style="display:none;float:left;margin-left:5px;" class="buttonclickB radius" onclick="changeColorItem()">Change Color</div>
            </div>
            <div id="clearer"></div>
            
            <div id="panel-container-item-category" style="width:100%;">
                <h2>Choose Category</h2>
                <?php
                $cat = mysql_query("select * from category order by name_category ASC");
                while($cat_ = mysql_fetch_array($cat)){
                    echo "<span title_Category=\"".$cat_['name_category']."\">".$cat_['name_category']."</span>";
                }
                ?>
            </div>
        
            <div id="panel-container-item-pilih">
            <div id="br"></div>
                <?php
                $cat2 = mysql_query("select * from category order by name_category ASC");
                while($cat2_ = mysql_fetch_array($cat2)){
                echo "<div id=\"Items_".$cat2_['name_category']."\" style=\"display:none;text-align:center;\">";
                    $item_cat = mysql_query("select * from item_category where id_category=".$cat2_['id_category']." order by name_item_category DESC");
                    while($item_cat_ = mysql_fetch_array($item_cat)){
                    echo "<h2>".$item_cat_['name_item_category']."</h2>";
                        $product = mysql_query("select * from product where id_item_category=".$item_cat_['id_item_category']."");
                        while($product_ = mysql_fetch_array($product)){
                            echo "<li item_model=\"".$item_cat_['name_item_category']."\" item_info_detail=\"".$product_['item_info']."\" 
                            item_model_detail=\"".$product_['item_model']."\" item_color=\"".$product_['item_color']."\" 
                            onClick=\"chooseItem('".$item_cat_['name_item_category']."','".$product_['item_model']."','".$product_['item_color']."')\" 
                            class=\"radius\">".$product_['item_model']."</li> "; // biarkan ada spasi setelah tutup tag li
                        }
                    echo "<div id=\"br\"></div>";
                    }
                echo "</div>";
                }
                ?>
            </div>
            
            <div id="panel-container-item-properties">
            <div id="backChooseItem" style="float:left;" class="buttonclickB radius" onclick="changeItem()">Change Item</div>
            <div id="clearItemRemove" style="float:left;margin-left:5px;" class="buttonclickC radius" onclick="clearItem()">Clear Item</div>
            <div id="clearer"></div><div id="br"></div>
                <h2>Choose Color</h2>
                <?php
                $item_cat2 = mysql_query("select * from item_category order by name_item_category DESC");
                    while($item_cat2_ = mysql_fetch_array($item_cat2)){
                        $product2 = mysql_query("select * from product where id_item_category=".$item_cat2_['id_item_category']."");
                        while($product2_ = mysql_fetch_array($product2)){
                        echo "<div id=\"".$item_cat2_['name_item_category']."-".$product2_['item_model']."\" class=\"pilihanWarnaItem\" style=\"display:none;\">";
                            $product3 = mysql_query("select * from color_product where id_product=".$product2_['id_product']."");
                            while($product3_ = mysql_fetch_array($product3)){
                            echo "<li onClick=\"chooseItem('".$item_cat2_['name_item_category']."','".$product2_['item_model']."','".$product3_['item_color']."')\" 
                            style=\"background:#".$product3_['color_hexa'].";\" title=\"".$product3_['title']."\"></li> "; // biarkan ada spasi setelah tutup tag li
                            }
                        echo "</div>";                        
                        }
                    }
                ?>
            </div>
            
        </div><!-- /panel-container-item -->
        
        <div id="panel-container-text">
        <div id="wrap-input-text"><input type="text" placeholder="Place Add Text" id="teks" class="radius"/></div>
        <div id="br2"></div>
        <a class="buttonclick radius" id="createTextId" onClick="createText()">Create Text</a>
        <div id="br"></div>
        <h2>Text Color</h2>
        <div id="colorpicker"></div>
        <div id="br"></div>
        <h2>Font Style</h2>
            <div id="fontstyleterpilih">
            <span style="font-family:Arial;" nama_font="Arial">Change Font</span>
            </div>
            
            <div id="fontstylepilihan" style="display:none;">
            <?php
            $font = mysql_query("select * from font order by name_font ASC");
            while($font_ = mysql_fetch_array($font)){
                echo "<span style=\"font-family:".$font_['name_style'].";\" nama_font=\"".$font_['name_font']."\">".$font_['name_font']."</span>";
            
            }
            ?>
            </div>
                
        <div id="clearer"></div>
        <div id="br"></div>
        <h2>Text Effect</h2>
        <div id="clearer"></div>
        </div><!-- /panel-container-text -->
        
        <div id="panel-container-image">
        <div id="titleimagecontainer">
        <h2>Upload Image</h2>
        <input id="imageUpload" type="file" value="Select Image" accept="image/*">
        <div class="radius" id="image_Upload"/>Select Image</div>
        <div id="br"></div>
        <h2>Choose Image</h2>
            <?php
            $image_cat = mysql_query("select * from image_category order by name_image_category ASC");
            while($image_cat_ = mysql_fetch_array($image_cat)){
                echo "<span title_Image=\"".$image_cat_['name_image_category']."\">".$image_cat_['name_image_category']."</span>";
            }
            ?>
        </div>
            <?php
            $image_cat2 = mysql_query("select * from image_category order by name_image_category ASC");
            while($image_cat2_ = mysql_fetch_array($image_cat2)){
                echo "<div id=\"image_".$image_cat2_['name_image_category']."\" class=\"image-wraps\" style=\"display:none;text-align:center;\">";
                $gambar = mysql_query("select * from gambar where id_image_category=".$image_cat2_['id_image_category']."");
                while($gambar_ = mysql_fetch_array($gambar)){
                    echo "<img src=\"icons/".$gambar_['folder']."/".$gambar_['name_gambar']."\"/>";
                }
                echo "</div>";
            }
            ?>
        <div id="backChooseImage" style="position:absolute;top:20px;display:none;" class="buttonclickB radius" onclick="changeImage()">Change Image</div>
        </div><!-- /panel-container-image -->
        
        <div id="panel-item" class="radius5kanan panel-config" onClick="openPanelItem()">Item</div>
        <div id="panel-text" class="radius5kanan panel-config" onClick="openPanelText()">Text</div>
        <div id="panel-image" class="radius5kanan panel-config" onClick="openPanelImage()">Image</div>
        <div id="panel-close" class="radius5kanan panel-config-close" onClick="ClosePanel()">Close</div>
    </div><!-- /panel -->
    
    <div id="navbar">
    <div id="navbar-container">
    <img src="images/save.png" width="25" style="cursor:pointer;" id="imageSave" onClick="saveDesain()"/>
    <img src="images/print.png" width="25" style="cursor:pointer;" id="imagePrint" />
    </div><!-- /navbar-container -->
    </div><!-- /navbar -->
    
    <div id="konten"><div id="konten2">
    <div id="container"><span class="chooseItemInPanel">Choose Item In Panel</span>
        <div id="item_product">
        <!-- <img src="1front.jpg"  height="490" id="view_front"> -->
        </div>
        <div id="making">
        </div><!-- /making -->
    </div><!-- /container -->
    <div id="clearer"></div>
    </div></div><!-- /konten -->
    
    <div id="navbar2">
    <div id="navbar2-container">
    <img src="images/save.png" width="25" style="cursor:pointer;" id="imageSave" onClick="saveDesain()"/>
    <img src="images/print.png" width="25" style="cursor:pointer;" id="imagePrint" />
    </div><!-- /navbar2-container -->
    </div><!-- /navbar2 -->
    
    <div id="footer"><div id="footer2">
    Copyright &copy; 2015
    </div></div><!-- /footer -->
    
    <div id="ScreenPreviewOverlay"></div>
    <div id="ScreenPreviewItem">
    <div id="wrap-close-ScreenPreviewItem" onClick="closePreviewItem()" style="display:none;"><img src='images/clear.png' height='13px' alt='preview remove'></div>
    <div id="wrap-image-ScreenPreviewItem"></div>
    <div id="wrap-text-ScreenPreviewItem" class="radius"></div>
    </div><!-- /ScreenPreviewItem -->
   

	</body>

</html>