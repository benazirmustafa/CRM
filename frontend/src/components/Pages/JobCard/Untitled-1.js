
{/* 
                    <Form.List name="filters">
                        {(fields, { add, remove }) => {
                            return (
                                <div style={{ overflow: "auto" }}>
                                    {fields.map((field) => (
                                        <Space
                                            id={field.key}
                                            key={field.key}
                                            style={{ display: "flex", marginBottom: 8 }}
                                            align="start"
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "profuct"]}
                                                fieldKey={[field.fieldKey, "profuct"]}
                                                rules={[
                                                    { required: true, message: "Missing profuct name" },
                                                ]}
                                            >
                                                <Select
                                                    style={{ width: 280 }}
                                                    id={`profuct${field.key}`}
                                                    // onChange={(e) => this.SetAtribute(e, field.key)}
                                                    placeholder="Please select profuct"
                                                >
                                                    {this.props.columns_list.map((col, i) => (
                                                        <Option key={i} value={col.id}>
                                                            {col.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                name={[field.name, "details"]}
                                                fieldKey={[field.fieldKey, "details"]}
                                                rules={[
                                                    { required: true, message: "Missing product details" },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}

                                                name={[field.name, "details"]}
                                                fieldKey={[field.fieldKey, "details"]}
                                                rules={[
                                                    { required: false, message: "Missing product details" },
                                                ]}
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "unit_price"]}
                                                fieldKey={[field.fieldKey, "unit_price"]}
                                                rules={[
                                                    { required: true, message: "Missing product unit price" },
                                                ]}
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "quantity"]}
                                                fieldKey={[field.fieldKey, "quantity"]}
                                                rules={[
                                                    { required: true, message: "Missing product quantity" },
                                                ]}
                                            >
                                                <InputNumber />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "amount"]}
                                                fieldKey={[field.fieldKey, "amount"]}
                                                rules={[
                                                    { required: true, message: "Missing amount" },
                                                ]}
                                            >
                                                <InputNumber readOnly />
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Space>
                                    ))}

                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add();
                                            }}
                                            block
                                        >
                                            <PlusOutlined /> Add Job Card Items
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List> */}