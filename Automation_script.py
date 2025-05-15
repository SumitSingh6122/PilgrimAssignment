import pandas as pd
import smtplib
from email.message import EmailMessage

# Step 1: Read data from CSV file
input_file = r'C:\Users\sumit singh\Documents\SalesData.csv'
df = pd.read_csv(input_file)


# Step 2: Filter rows where Sales > 1000 
filtered_df = df[df['Sales'] > 1000]

# Step 3: Save filtered rows to in new CSV file
output_file = r'C:\Users\sumit singh\Documents\FilteredSalesData.csv'
filtered_df.to_csv(output_file, index=False)

print(f"Filtered data saved to {output_file}")

#  Step 4: Send filtered file via email by using smtplib
def send_email(receiver_email):
    sender_email = 'email@example.com'
    sender_password = 'password'

    msg = EmailMessage()
    msg['Subject'] = 'Filtered Sales Data'
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg.set_content('Hi,\n\nPlease find attached the filtered sales data where Sales > 1000.\n\nBest Regards')

    # Attach filtered CSV file
    with open(output_file, 'rb') as f:
        file_data = f.read()
        file_name = 'FilteredSalesData.csv'  

    msg.add_attachment(file_data, maintype='text',
                       subtype='csv',
                       filename=file_name)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender_email, sender_password)
        smtp.send_message(msg)

    print(f"Email sent successfully to {receiver_email}")


send_email('recipient@example.com')
