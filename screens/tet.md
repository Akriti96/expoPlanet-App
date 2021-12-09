<View style={[styles.cardItem, { flexDirection: 'column' }]}>
              <Text>{details.specifications ? `Specifications : ` : ''}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>