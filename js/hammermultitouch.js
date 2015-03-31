// JavaScript Document


	

   /*if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.showTouches();
   }

	 if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.fakeMultitouch();
        }*/

	
	
	function manageMultitouch(ev){
		
		switch(ev.type) {
            case 'touch':
                last_scale = scale;
                last_rotation = rotation;
				
                break;

            case 'drag':
                	posX = ev.gesture.deltaX + lastPosX;
                	posY = ev.gesture.deltaY + lastPosY;
                break;

            case 'transform':
                rotation = last_rotation + ev.gesture.rotation;
                scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
                break;
				
			case 'dragend':
				lastPosX = posX;
				lastPosY = posY;
				break;
        }
		
        var transform =
                "translate3d("+posX+"px,"+posY+"px, 0) " +
                "scale3d("+scale+","+scale+", 0) " +
                "rotate("+rotation+"deg) ";
			
        elemRect.style.transform = transform;
        elemRect.style.oTransform = transform;
        elemRect.style.msTransform = transform;
        elemRect.style.mozTransform = transform;
        elemRect.style.webkitTransform = transform;
	}