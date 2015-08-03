<!DOCTYPE html>
<head>
<title>testing game</title>	
<link href='http://fonts.googleapis.com/css?family=News+Cycle' rel='stylesheet' type='text/css'>
<link href="style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">

</head>


<body>
	<p><h2>Memorize Matching</h2></p>
	<div class="info">
		<p><h3>Blocks: <span id="rows">16</span> Difficulty: <span id="difficulty"></span>
		Timer: <span id="timer"></span></h3></p>
		<p><input type ="button" value = "Start Game" onclick = "engineOn()" ></input></p>
	</div>
	<p><input type="range" class="slider" name="points" id="points" value="16" min="16" step="4" max="28"></p>

	<div class="messageBox"><span id="messageFirst"></span>
	<span id="messageSecond"></span><span id="counterStart"></span></div>
	<div class="container">	
		<div class="gameBoard" id="gameCanvas"></div>
	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
	<script src="engine.js"></script>
</body>

</html>