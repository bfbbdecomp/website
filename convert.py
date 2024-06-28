

def hex_to_bin(hex_value):
    return bin(int(hex_value, 16))[2:].zfill(8)

def convert_file(input_file, output_file):
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        for line in infile:
            hex_values = line.strip().split()
            bin_values = [hex_to_bin(hex_val) for hex_val in hex_values]
            outfile.write(' '.join(bin_values) + '\n')

input_file = 'src/code/binary.txt'
output_file = 'binary_values.txt'
convert_file(input_file, output_file)
