from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    details = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='product_image', blank=True)
    unit_price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

    def get_stock_amount(self):
        stock = Stock.objects.get(product=self)
        return stock.quantity


class Stock(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    min_quantity = models.IntegerField()
    quantity = models.IntegerField()

    def __str__(self):
        return "Name :" + self.product.name + ", Quantity : " + str(self.quantity)


class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    contact = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.name

    def get_customer_balance(self):
        invoices = Invoice.objects.filter(customer=self).filter(done=False)
        balance = 0.0
        for invoice in invoices:
            balance += invoice.total_due
        return balance


class JobCard(models.Model):
    jobcard_number = models.CharField(max_length=500, unique=True)
    timestamp = models.DateTimeField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)  # locked edit option when true
    total_amount = models.FloatField()
    advance = models.FloatField(null=True, blank=True)
    due = models.FloatField(null=True, blank=True)
    cheque_no = models.CharField(max_length=255, null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    quotation_date = models.DateField(null=True, blank=True)
    quotation_number = models.CharField(
        max_length=500, null=True, blank=True, unique=True)
    invoice_number = models.CharField(
        max_length=500, null=True, blank=True, unique=True)

    def __str__(self):
        return str(self.jobcard_number)

    # def total(self):
    #     if self.jobcarditems_set.all():
    #         total = 0
    #         for index, items in enumerate(self.jobcarditems_set.all()):
    #             total+=items.amount
    #         return total


class JobCardItems(models.Model):
    jobcard = models.ForeignKey(JobCard, on_delete=models.CASCADE)
    # product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    product = models.CharField(max_length=255, null=True, blank=True)
    details = models.CharField(max_length=500, null=True, blank=True)
    unit = models.CharField(max_length=255, null=True, blank=True)
    unit_price = models.FloatField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    amount = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)

    def get_final_quantity(self):
        return self.prev_quantity + self.quantity

# class Spayment(models.Model):
#     purchase = models.ForeignKey(Purchase)
#     deposit_id = models.CharField(max_length=255, null=True, blank=True)
#     first_payment = models.BooleanField(default=False)
#     amount = models.FloatField()
#     due = models.FloatField(null=True, blank=True)
#     timestamp = models.DateTimeField()
#     def __str__(self):
#         return str(self.deposit_id)


class Invoice(models.Model):
    invoice_id = models.CharField(
        max_length=255, null=True, blank=True, unique=True)
    jobcard = models.ForeignKey(JobCard, null=True, on_delete=models.CASCADE)
    date = models.DateTimeField()
    delivery_date = models.DateTimeField()
    done = models.BooleanField(default=False)
    total_discount = models.FloatField(null=True, blank=True)
    total_amount = models.FloatField(null=True, blank=True)
    tax = models.FloatField(null=True, blank=True)
    total_due = models.FloatField(null=True, blank=True)
    note = models.TextField(max_length=2048, null=True, blank=True)

    def __str__(self):
        return self.invoice_id


class Quatation(models.Model):
    quatation_id = models.CharField(
        max_length=255, null=True, blank=True, unique=True)
    jobcard = models.ForeignKey(JobCard, null=True, on_delete=models.CASCADE)
    date = models.DateTimeField()
    done = models.BooleanField(default=False)
    total_discount = models.FloatField(null=True, blank=True)
    total_amount = models.FloatField(null=True, blank=True)
    validity = models.DateTimeField(null=True, blank=True)
    note = models.TextField(max_length=2048, null=True, blank=True)

    def __str__(self):
        return self.quatation_id
