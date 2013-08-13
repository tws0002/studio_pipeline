﻿// SPCreateCarLumaMattesFromSelection// For each selected comp makes 3comps with luma mattes from RGB channels{	function SPCreateLumaMattesFromRGB ( theComp , baseName , rName , gName , bName )	{		var matteCompR = theComp.duplicate ();		var matteCompG = theComp.duplicate ();		var matteCompB = theComp.duplicate ();				matteCompR.name = baseName+rName;		matteCompG.name = baseName+gName;		matteCompB.name = baseName+bName;				var matteComps = [matteCompR,matteCompG,matteCompB];				for (var i=0, len=matteComps.length; i<len; i++){			var matteComp = matteComps[i];			while ( matteComp.numLayers > 0 )			{				var layer = matteComp.layer(1);				layer.remove();							}			matteComp.layers.add(theComp);			var layer = matteComp.layer(1);			var effect = layer.Effects.addProperty("ADBE Shift Channels");			effect.property("Take Red From").setValue(1);			effect.property("Take Green From").setValue(1);			effect.property("Take Blue From").setValue(1);		}		matteCompR.layer(1).Effects.property("ADBE Shift Channels").property("Take Alpha From").setValue(2);		matteCompG.layer(1).Effects.property("ADBE Shift Channels").property("Take Alpha From").setValue(3);		matteCompB.layer(1).Effects.property("ADBE Shift Channels").property("Take Alpha From").setValue(4);	}	function SPGetCarMultimatteChannelNames ( theComp )	{		if  (theComp.name.indexOf("multimatte_lights") != -1){			return ["matte_lights_","Taillights","FogAndSidelights","Headlights"];		}		else if  (theComp.name.indexOf("multimatte_main") != -1){			return ["matte_main_","Paint","G","Windows"];					}		else if  (theComp.name.indexOf("multimatte_parts") != -1){			return ["matte_parts_","PlasticAndRubber","MetalAndBacking","Chrome"];					}		else if  (theComp.name.indexOf("multimatte_wheels") != -1){			return ["matte_wheels_","Brakes","Tyre","Alloys"];					}		else {			theComp.name = theComp.name.replace(" source","");			return [theComp.name,"_R","_G","_B"];					}	}		function SPCreateCarLumaMattesForItems ( selectedItems ) {		var i=0;		var len=selectedItems.length;		try { selectedItems[0]; }		catch(err) { i=1; len++;}		var originalSelection = [];		for ( i ; i<len; i++)		{			var item = selectedItems[i];			originalSelection.push (item);		}		for ( i=0,len=originalSelection.length ; i<len; i++)		{			var item = originalSelection[i];			if (item instanceof CompItem)			{				var channels = SPGetCarMultimatteChannelNames ( item );				SPCreateLumaMattesFromRGB (  item, channels[0] , channels[1] , channels[2] , channels[3] );			}		}			}	function SPCreateCarLumaMattesFromSelection()	{		var scriptName = "Create car luma mattes from selection";							app.beginUndoGroup(scriptName);				var selectedItems = app.project.selection;			SPCreateCarLumaMattesForItems ( selectedItems );		app.endUndoGroup();	}	SPCreateCarLumaMattesFromSelection()}