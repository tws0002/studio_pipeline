﻿/*SPCreateFolderForRenderQueueSequences()For sequences in render queue, make a folder based on the sequence name in the seqence parent.Written by Dnaiel Harkness, Spinifex Group, 2013*/{	function SPCreateFolderForRenderQueueSequences()	{		var scriptName = "Create Folder for Render Queue Sequences";		var currentProject = app.project ;		var myQueue = currentProject.renderQueue;				// Check a project is open		if (!currentProject)		{			alert ("A project must be open to use this script.", scriptName);			return;		}			// Check for items in render queue		if (myQueue.numItems < 1)		{			alert("You do not have any items set to render.", scriptName);				return;		}		var queuedRenderItems = 0;				// Cycle through render queue and check if any queued items		for (var i=1,len=myQueue.numItems; i<=len; i++)		{			var RQItem = myQueue.item(i);			// Can only modify queued items			if (RQItem.status == RQItemStatus.QUEUED)			{				queuedRenderItems++;			}		}		if (queuedRenderItems == 0)		{			alert("There are no queued render items. The path is set on queued renders only.", scriptName);			return;		}		// Cycle through render queue		app.beginUndoGroup(scriptName);		for (var i=1,len=myQueue.numItems; i<=len; i++)		{			var RQItem = myQueue.item(i);			// Can only modify queued items			if (RQItem.status == RQItemStatus.QUEUED)			{							// Create a folder for each file sequence the set the output module to that				var lastOMItem = RQItem.outputModules[RQItem.numOutputModules];												var sequenceFileName = lastOMItem.file.name.replace( "_%5B#####%5D","") ; // Remove _[#####]				if (sequenceFileName == lastOMItem.file.name) 				{					alert("Last output module of " +sequenceFileName +" is not a _[#####] file sequence.", scriptName);				}				else{										sequenceFileName = sequenceFileName.substr(0, sequenceFileName.lastIndexOf('.')); // Remove Extension					if (sequenceFileName == lastOMItem.file.parent.name) 					{						alert(sequenceFileName+ " last output module already has folder named correctly for the sequence.", scriptName);					}					var sequenceFolderPath = new Folder ( lastOMItem.file.path + "/" + sequenceFileName )					sequenceFolderPath.create();					var sequencePath = new File ( sequenceFolderPath.path + "/" + sequenceFolderPath.name + "/" + lastOMItem.file.name );										lastOMItem.file = sequencePath;				}			}			app.endUndoGroup();		}		}	SPCreateFolderForRenderQueueSequences();}