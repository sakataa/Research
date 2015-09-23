angular.module("sportsStore")
.controller("sportsStoreCtrl", function ($scope) {
	$scope.data = {
		products: [
			{ name: "Product #1", description: "A product",
			category: "Category #1", price: 100 },
			{ name: "Product #2", description: "A product",
			category: "Category #1", price: 110 },
			{ name: "Product #3", description: "A product",
			category: "Category #2", price: 210 },
			{ name: "Product #4", description: "A product",
			category: "Category #3", price: 202 },
			
			{category:"Watersports",description:"A boat for one person",name:"Kayak",
			price:275},
			{category:"Watersports", description:"Protective and fashionable",
			name:"Lifejacket",price:48.95},
			{category:"Soccer",description:"FIFA-approved size and weight",
			name:"Soccer Ball",price:19.5},
			{category:"Soccer",description:"Give your playing field a professional touch",
			name:"Corner Flags",price:34.95},
			{category:"Soccer",description:"Flat-packed 35,000-seat stadium",
			name:"Stadium",price:79500},
			{category:"Chess",description:"Improve your brain efficiency by 75%",
			name:"Thinking Cap",price:16},
			{category:"Chess",description:"Secretly give your opponent a disadvantage",
			name:"Unsteady Chair",price:29.95},
			{category:"Chess",description:"A fun game for the family",
			name:"Human Chess Board",price:75},
			{category:"Chess",description:"Gold-plated, diamond-studded King",
			name:"Bling-Bling King",price:1200}]
	};
});