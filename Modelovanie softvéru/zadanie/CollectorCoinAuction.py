import json


class User:
    def __init__(self, email, name, username):
        self.email = email
        self.name = name
        self.username = username
        self.address = None
        self.paymentInfo = []

    def addAddress(self, address):
        self.address = address

    def addPaymentInfo(self, payment):
        self.paymentInfo.append(payment)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class Seller(User):
    def __init__(self, email, name, username):
        super().__init__(email, name, username)
        self.auctions = []

    def addAuction(self, auction):
        self.auctions.append(auction)

    def toJSON(self):
        return super().toJSON()


class Buyer(User):
    def __init__(self, email, name, username):
        super().__init__(email, name, username)

    def toJSON(self):
        return super().toJSON()


class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class Coin(Product):
    def __init__(self, name, price, age, condition):
        super().__init__(name, price)
        self.age = age
        self.condition = condition

    def toJSON(self):
        return super().toJSON()


class CoinSet(Product):
    def __init__(self, name, price, coins, numberOfCoins, setName):
        super().__init__(name, price)
        self.coins = coins
        self.numberOfCoins = numberOfCoins
        self.setName = setName

    def toJSON(self):
        return super().toJSON()


class Address:
    def __init__(self, city, country, postalCode, street, state):
        self.city = city
        self.country = country
        self.postalCode = postalCode
        self.street = street
        self.state = state

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class Payment:
    def __init__(self, amount, paymentInfo):
        self.amount = amount
        self.paymentInfo = paymentInfo

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class PaymentInfo:
    def __init__(self, id):
        self.id = id

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class PayPalAccount(PaymentInfo):
    def __init__(self, id, token, username):
        super().__init__(id)
        self.token = token
        self.username = username

    def toJSON(self):
        return super().toJSON()


class CreditCard(PaymentInfo):
    def __init__(self, id, cardNumber, cardholderName, expirationDate, securityCode):
        super().__init__(id)
        self.cardNumber = cardNumber
        self.cardholderName = cardholderName
        self.expirationDate = expirationDate
        self.securityCode = securityCode

    def toJSON(self):
        return super().toJSON()


class Auction:
    def __init__(self, currentPrice, endTime, item, nextMinPrice, seller):
        self.currentPrice = currentPrice
        self.endTime = endTime
        self.item = item
        self.nextMinPrice = nextMinPrice
        self.seller = seller

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


def sell():
    options = ("coin", "coinset")

    print("Select an option: ")
    for index, option in enumerate(options):
        print(index + 1, option)
    option = options[int(input("Enter the name of the option: ")) - 1]

    if option == "coin":
        # get all info for coin
        coinName = input("Enter the name of the coin: ")
        coinPrice = int(input("Enter the price of the coin: "))
        coinAge = int(input("Enter the age of the coin: "))
        coinCondition = input("Enter the condition of the coin: ")

        # create coin
        coin = Coin(coinName, coinPrice, coinAge, coinCondition)

        # create auction
        auction = Auction(
            coinPrice,
            "",
            coin,
            100,
            seller,
        )

        # add auction to seller
        seller.addAuction(auction)

        # add auction to auctions
        auctions.append(auction)

        print("Coin added to auction")
        # print coin info
        print("Coin Name: ", coin.name)
        print("Coin Price: ", coin.price)
        print("Coin Age: ", coin.age)
        print("Coin Condition: ", coin.condition)
        print("Price: ", auction.currentPrice)

        return
    elif option == "coinset":
        # get all info for coin set
        coinSetName = input("Enter the name of the coin set: ")
        coinSetPrice = int(input("Enter the price of the coin set: "))
        coinSetNumberOfCoins = int(input("Enter the number of coins in the coin set: "))
        coinSetSetName = input("Enter the name of the set: ")

        # get coins for coin set
        coins = []
        for i in range(coinSetNumberOfCoins):
            coinName = input("Enter the name of the coin: ")
            coinPrice = int(input("Enter the price of the coin: "))
            coinAge = int(input("Enter the age of the coin: "))
            coinCondition = input("Enter the condition of the coin: ")

            coin = Coin(coinName, coinPrice, coinAge, coinCondition)
            coins.append(coin)

        # create coin set
        coinSet = CoinSet(
            coinSetName,
            coinSetPrice,
            coins,
            coinSetNumberOfCoins,
            coinSetSetName,
        )

        # create auction
        auction = Auction(
            coinSetPrice,
            "",
            coinSet,
            100,
            seller,
        )

        # add auction to seller
        seller.addAuction(auction)

        # add auction to auctions
        auctions.append(auction)

        print("Coin set created!")
        print("Coin set: " + coinSet.name)
        print("Price: " + str(coinSet.price))
        print("Number of coins: " + str(coinSet.numberOfCoins))
        print("Set name: " + coinSet.setName)
        print("Coins: ")
        for coin in coins:
            print(coin.name)

        return
    else:
        print("Invalid option")


def buy():
    print("Select an auction to attend: ")
    for index, auction in enumerate(auctions):
        print(index + 1, auction.item.name)
    auction = auctions[int(input("Enter the name of the auction: ")) - 1]

    print(
        f"Select bid amount (minimum: {auction.currentPrice + auction.nextMinPrice}): "
    )

    bidAmount = int(input())

    if bidAmount < auction.currentPrice + auction.nextMinPrice:
        print("Bid amount is too low")
        return

    print("Congratulations! You won the auction!")

    print("Select payment method: ")
    for index, payment in enumerate(auction.seller.paymentInfo):
        print(index + 1, payment.cardNumber)
    payment = auction.seller.paymentInfo[
        int(input("Enter the name of the payment method: ")) - 1
    ]

    print("Thank you for your purchase!")


def main():
    option = input("Do you want to sell or buy? ")

    if option == "sell":
        sell()
    elif option == "buy":
        buy()
    else:
        print("Invalid option")


address = Address("New York", "USA", "10001", "Wall Street", "NY")
creditCard = CreditCard("1", "123456789", "John Doe", "12/20", "123")

buyer = Buyer("janedoe@test.test", "Jane Doe", "janedoe")
buyer.addAddress(address)
buyer.addPaymentInfo(creditCard)

seller = Seller("johndeer@test.test", "John Deer", "johndeer")
seller.addAddress(address)
seller.addPaymentInfo(creditCard)

auctions = [
    Auction(100, "12/12/12", Coin("Gold", 100, "12/12/12", "Good"), 100, seller),
    Auction(200, "12/12/12", Coin("Silver", 200, "12/12/12", "Good"), 100, seller),
    Auction(300, "12/12/12", Coin("Platinum", 300, "12/12/12", "Good"), 100, seller),
]

if __name__ == "__main__":
    main()
