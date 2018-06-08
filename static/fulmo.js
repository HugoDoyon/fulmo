$(document).ready(function() {

	console.log('Document Ready');
	
	defaultView();
	refresh();

	// ------------------------------
	// button handlers
	
	// connect button event
	$('#connect').click(function() {
		connect();
		listchannels();	
        });

	// create invoice button event
	$('#createInvoice').click(function() {
		createInvoice();
	});

	// funding button event
        $('#fundingButton').click(function() {
                getNewAddr();
        });
	
	// clear button event
        $('#clear').click(function() {
                clear();
        });
	
	// help button event
        $('#help').click(function() {
                help();
        });
	// ------------------------------

	// ------------------------------
	// display/navigation

        // show node info - default view
        $('#shownodeinfo').click(function() {
		defaultView();
        });

        // show channels and peers
        $('#showchannelspeers').click(function() {
                $('#getinfo').hide();
                $('#channels').show();
                $('#funding').hide();
                $('#invoices').hide();
		$('#buttons').show();
		$('#connections').show();
	});

        // show payments and invoices
        $('#showpayments').click(function() {
                $('#getinfo').hide();
                $('#channels').hide();
                $('#funding').show();
                $('#invoices').show();
		$('#buttons').show();
		$('#connections').hide();
	});

        // show all
        $('#showall').click(function() {
                $('#getinfo').show();
                $('#channels').show();
                $('#funding').show();
                $('#invoices').show();
		$('#buttons').show();
		$('#connections').show();
        });
	// ------------------------------

	// refresh statuses
	window.setInterval(refresh, 30000);
});

function defaultView(){
	$('#getinfo').show();
        $('#channels').hide();
        $('#funding').hide();
        $('#invoices').hide();
	$('#buttons').hide();
	$('#connections').hide();
}

function refresh(){
	console.log("refresh");	
	getinfo();
	listchannels();
}

function getinfo(){
        $.get( "getinfo/", function( data ) {
                $('#getinfoText').html(data);
		console.log( "LN node stats: " + data );
        });	
}

function connect(){
	var connectEndpoint = "connect/";
	var node = $('#connection').val();
	var connectURL = connectEndpoint + "?c=" + node
	var satoshis = Number($('#connectionAmount').val());
	connectURL = connectURL + "&satoshis=" + satoshis;
	
        $.get( connectURL, function( data ) {
                $('#connectionText').html(data);
		// console.log( "Connection: " + data );
        });
}

function getNewAddr(){
	var addrURL = "newaddr/";
        if ($('#bech32').is(':checked')){
                addrURL = addrURL + "?type=bech32";
        }
	$.get( addrURL, function( data ) {
                $('#fundingText').html(data);
                console.log( "New Address: " + data );
        });
}

function listchannels(){
        $.get( "listchannels/", function( data ) {
                $('#channelText').html(data);
                console.log( "LN list channels: " + data );
        });
}

function createInvoice(){
	var amount = $('#invoiceAmount').val();
	var description = $('#invoiceDescription').val();
	var invoiceURL = "invoice/?amount=" + amount + "&description=" + description;

	if ($('#invoiceQR').is(':checked')){
		invoiceURL = invoiceURL + "&qr";
	}

	$.get( invoiceURL, function( data ) {
		$('#invoiceText').html(data);
		console.log( "Invoice: " + data );
        });
}

function clear(){
	$('#invoiceText').html("");
	$('#fundingText').html("");
	$('#connectionText').html("");
}

function help(){
	$.get( "help/", function( data ) {
		console.log( "LN Help: " + data );
	});
}
